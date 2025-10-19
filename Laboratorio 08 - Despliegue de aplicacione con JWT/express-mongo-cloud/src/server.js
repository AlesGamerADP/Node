import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';
import axios from 'axios';
import DigestFetch from 'digest-fetch';

dotenv.config();

const {
  ATLAS_PUBLIC_KEY,
  ATLAS_PRIVATE_KEY,
  ATLAS_PROJECT_ID,
  MONGO_URI,
  PORT = 3000
} = process.env;

const projectId = ATLAS_PROJECT_ID.trim();

console.log('Variables de entorno cargadas:');
console.log('ATLAS_PUBLIC_KEY:', ATLAS_PUBLIC_KEY ? 'OK' : 'MISSING');
console.log('ATLAS_PRIVATE_KEY:', ATLAS_PRIVATE_KEY ? 'OK' : 'MISSING');
console.log('ATLAS_PROJECT_ID:', ATLAS_PROJECT_ID ? 'OK' : 'MISSING');
console.log('MONGO_URI:', MONGO_URI ? 'OK' : 'MISSING');
console.log('PORT:', PORT);

// Cliente Digest para autenticación con la API de Atlas
const digestClient = new DigestFetch(
  ATLAS_PUBLIC_KEY.trim(),
  ATLAS_PRIVATE_KEY.trim()
);

// Función para probar autenticación y listar IPs en whitelist
async function testAuth() {
  const url = `https://cloud.mongodb.com/api/atlas/v1.0/groups/${projectId}/accessList`;
  try {
    const res = await digestClient.fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (!res.ok) throw new Error(`Código HTTP ${res.status}`);

    const data = await res.json();
    console.log('Autenticación exitosa. Lista de IPs:', data);
  } catch (error) {
    console.error('Error autenticando con digest-auth:', error.message);
    throw error;
  }
}

// Función para obtener la IP pública usando ifconfig.me
async function getPublicIP() {
  try {
    console.log('Obteniendo IP pública desde ifconfig.me...');
    const res = await axios.get('https://ifconfig.me/ip', { timeout: 5000 });
    const ip = res.data.trim();
    console.log('IP obtenida:', ip);
    return ip;
  } catch (error) {
    console.error('Error obteniendo IP pública:', error.message);
    throw error;
  }
}

// Función para agregar IP al whitelist de Atlas
async function addIPToWhitelist(ip) {
    const url = `https://cloud.mongodb.com/api/atlas/v2/groups/${projectId}/accessList`;

  console.log(`Agregando IP ${ip} al whitelist de Atlas...`);
  try {
    const res = await digestClient.fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([{ ipAddress: ip, comment: 'Added via server startup' }])
    });

    const data = await res.json();

    if (!res.ok && res.status !== 409) {
      throw new Error(JSON.stringify(data));
    }

    if (res.status === 409) {
      console.log(`IP ${ip} ya está en la whitelist.`);
    } else {
      console.log(`IP ${ip} agregada correctamente a la whitelist.`);
    }
  } catch (err) {
    console.error('Error al agregar IP con digest-auth:', err.message);
    throw err;
  }
}

// Proceso principal
(async () => {
  try {
    await testAuth(); // Validar autenticación

    const ip = await getPublicIP();
    await addIPToWhitelist(ip);

    await mongoose.connect(MONGO_URI);
    console.log('Conectado a MongoDB Atlas');

    app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
  } catch (err) {
    console.error('Error en el inicio del servidor:', err.message);
  }
})();
