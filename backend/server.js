const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth.routes');
const clienteRoutes = require('./routes/cliente.routes');
const productoRoutes = require('./routes/producto.routes');
const facturaRoutes = require('./routes/factura.routes'); // ✅

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// ✅ Escucha en todas las interfaces para acceso externo
app.listen(4000, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en http://0.0.0.0:4000`);
});

// Rutas API
app.use('/api/login', authRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/facturas', facturaRoutes); // ✅ debe coincidir con Flutter

// Ruta raíz (opcional)
app.get('/', (req, res) => {
  res.send('✅ API Node.js corriendo');
});
