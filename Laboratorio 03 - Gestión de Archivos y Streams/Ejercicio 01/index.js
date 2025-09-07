/*const fs = require('fs');
const readable = fs.createReadStream('datos.txt', { encoding: 'utf-8' });
readable.on('data', chunk => console.log('Fragmento recibido', chunk));
readable.on('end', () => console.log('Lectura completa'));
readable.on('error', err => console.log('Error:', err));*/

/*const writable = fs.createWriteStream('salida.txt');
writable.write('Este es un nuevo mensaje de prueba\n');
writable.end('Fin del mensaje.');
writable.on('finish', () => console.log('Escritura completada.'));*/

/*const zlilb = require('zlib');
const readStream = fs.createReadStream('entrada.txt');
const writeStream = fs.createWriteStream('entrada.txt.gz');
const gzip = zlilb.createGzip();
readStream.pipe(gzip).pipe(writeStream);*/

/*readable.on('data', chunk => {
    if (!writable.write(chunk)) {
        console.log('Pausando lectura');
        readable.pause();
    }
});
writable.on('drain', () => readable.resume(), console.log('Reanudando lectura'));*/

const {Transform} = require('stream');
const fs = require('fs');

const transform = new Transform({
    transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase());
    }
});

const readStream = fs.createReadStream('texto.txt');
const writeStream = fs.createWriteStream('texto_mayusculas.txt');

readStream.pipe(transform).pipe(writeStream);