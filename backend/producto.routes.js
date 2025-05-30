const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los productos
router.get('/', (req, res) => {
  db.all('SELECT * FROM productos', (err, rows) => {
    if (err) {
      console.error('❌ Error al obtener productos:', err.message);
      return res.status(500).json({ error: 'Error al obtener productos' });
    }
    res.json(rows);
  });
});

// Crear un nuevo producto
router.post('/', (req, res) => {
  const { nombre, precio } = req.body;

  if (!nombre || precio === undefined) {
    return res.status(400).json({ error: 'Nombre y precio son requeridos' });
  }

  db.run(
    'INSERT INTO productos (nombre, precio) VALUES (?, ?)',
    [nombre, precio],
    function (err) {
      if (err) {
        console.error('❌ Error al crear producto:', err.message);
        return res.status(500).json({ error: 'Error al guardar producto' });
      }
      res.status(201).json({ id: this.lastID, nombre, precio });
    }
  );
});

// Actualizar un producto existente
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;

  db.run(
    'UPDATE productos SET nombre = ?, precio = ? WHERE id = ?',
    [nombre, precio, id],
    function (err) {
      if (err) {
        console.error('❌ Error al actualizar producto:', err.message);
        return res.status(500).json({ error: 'Error al actualizar producto' });
      }
      res.status(200).json({ mensaje: 'Producto actualizado' });
    }
  );
});

// Eliminar un producto
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM productos WHERE id = ?', [id], function (err) {
    if (err) {
      console.error('❌ Error al eliminar producto:', err.message);
      return res.status(500).json({ error: 'Error al eliminar producto' });
    }
    res.status(200).json({ mensaje: 'Producto eliminado' });
  });
});

module.exports = router;
