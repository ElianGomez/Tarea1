const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('🟢 ¡Servidor básico en línea!');
});

server.listen(4000, '0.0.0.0', () => {
  console.log('🧪 Servidor básico corriendo en http://0.0.0.0:4000');
});
