const express = require('express');
const router = express.Router();




router.get('/', (req, res) => {
  res.send('✅ Ruta de facturas funcionando');
});

router.post('/', (req, res) => {
  const factura = req.body;
  console.log('🧾 Factura recibida:', factura);
  res.status(200).json({ mensaje: 'Factura recibida correctamente' });
});

module.exports = router;
