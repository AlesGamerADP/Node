# Node.js

**Node.js** es un entorno de ejecución de JavaScript, de código abierto y multiplataforma, que permite crear aplicaciones de red y del lado del servidor rápidas y escalables.  
Se ejecuta sobre el motor de JavaScript **V8** y utiliza una arquitectura de **E/S (entrada/salida) basada en eventos y sin bloqueo**, lo que lo hace altamente eficiente y adecuado para aplicaciones en tiempo real.

---

## Laboratorio 06: Introducción a Bases de Datos No SQL

Este proyecto utiliza **MongoDB** para crear una aplicación que guarda usuarios y posts en una base de datos.  

### Requisitos para clonar y ejecutar el proyecto

1. Clonar el repositorio
```
git clone <URL_DEL_REPOSITORIO>
```

2. Crear un archivo .env en la raíz del proyecto con los siguientes datos:
```
MONGO_URI=mongodb://localhost:27017/socialmedia
PORT=3001
```

3. Instalar las dependencias
```
npm install
```

4. Iniciar la aplicación
```
npm start
```

La aplicación estará disponible en http://localhost:3001.

Tecnologías usadas
- Node.js
- Express
- MongoDB
- EJS (plantillas)
- Materialize CSS (para estilos básicos)
