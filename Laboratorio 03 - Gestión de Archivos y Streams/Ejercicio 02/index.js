const http = require('http');
const PORT = 3000;
const  ExcelJS  =  require ( 'exceljs' ) ;
const fs = require ('fs')


const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    if (req.url === '/') {
        res.statusCode = 200;
        res.end("Bienvenido a la página principal");
    } else if (req.url === '/reporte') {
        res.writeHead(200, {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': 'attachment; filename="ventas.xlsx"'
          });
        fs.createReadStream('ventas.xlsx').pipe(res);
    } else {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 404;
        res.end("Visita /reporte para descargar el Excel");
    }
});

const workbook = new ExcelJS.Workbook();
const sheet = workbook.addWorksheet('Ventas');
sheet.columns = [
  { header: 'Producto', key: 'producto', width: 25 },
  { header: 'Cantidad', key: 'cantidad', width: 15 },
  { header: 'Precio', key: 'precio', width: 15 }
];

const productos = [
  { producto: 'Laptop', cantidad: 5, precio: 2500 },
  { producto: 'Mouse', cantidad: 15, precio: 25 },
  { producto: 'Teclado', cantidad: 10, precio: 50 },
  { producto: 'Monitor', cantidad: 7, precio: 800 },
  { producto: 'Impresora', cantidad: 3, precio: 600 },
  { producto: 'USB 32GB', cantidad: 20, precio: 15 },
  { producto: 'Tablet', cantidad: 8, precio: 1200 },
  { producto: 'Auriculares', cantidad: 12, precio: 150 },
  { producto: 'Disco Duro 1TB', cantidad: 6, precio: 400 },
  { producto: 'Silla Gamer', cantidad: 4, precio: 900 },
  { producto: 'Parlantes', cantidad: 9, precio: 200 },
  { producto: 'Cámara Web', cantidad: 11, precio: 180 },
  { producto: 'Micrófono', cantidad: 13, precio: 220 },
  { producto: 'Router WiFi', cantidad: 10, precio: 300 },
  { producto: 'Cargador Universal', cantidad: 14, precio: 60 },
  { producto: 'Smartwatch', cantidad: 7, precio: 700 },
  { producto: 'Proyector', cantidad: 2, precio: 1500 },
  { producto: 'Cable HDMI', cantidad: 18, precio: 20 },
  { producto: 'SSD 512GB', cantidad: 5, precio: 450 },
  { producto: 'Fuente de Poder', cantidad: 6, precio: 350 }
];

productos.forEach(p => {
  sheet.addRow(p);
});

workbook.xlsx.writeFile('ventas.xlsx').then(() => {
    const readable = fs.createReadStream('ventas.xlsx');

    readable.on('open', () => console.log('Archivo Excel creado y listo para leerse'));
    readable.on('data', chunk => console.log('Fragmento recibido', chunk));
    readable.on('end', () => console.log('Lectura completa del archivo Excel'));
    readable.on('error', err => console.error('Error al leer el archivo:', err));
});


server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

