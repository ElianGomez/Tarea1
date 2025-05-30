const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los clientes
router.get('/', (req, res) => {
  db.all('SELECT * FROM clientes', (err, rows) => {
    if (err) {
      console.error('❌ Error al obtener clientes:', err.message);
      res.status(500).json({ error: 'Error al obtener clientes' });
    } else {
      res.json(rows);
    }
  });
});

  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, correo } = req.body;

    db.run(
      'UPDATE clientes SET nombre = ?, correo = ? WHERE id = ?',
      [nombre, correo, id],
      function (err) {
        if (err) {
          console.error('❌ Error al actualizar cliente:', err.message);
          res.status(500).json({ error: 'Error al actualizar' });
        } else {
          console.log(`✅ Cliente con ID ${id} actualizado`);
          res.status(200).json({ mensaje: 'Actualizado' });
        }
      }
    );
  });

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM clientes WHERE id = ?', [id], function (err) {
    if (err) {
      console.error('❌ Error al eliminar:', err.message);
      res.status(500).json({ error: 'Error al eliminar cliente' });
    } else {
      res.status(200).json({ mensaje: 'Cliente eliminado' });
    }
  });
});


// Crear un nuevo cliente
router.post('/', (req, res) => {
  const { nombre, correo } = req.body;

  if (!nombre || !correo) {
    return res.status(400).json({ error: 'Nombre y correo son requeridos' });
  }

  db.run(
    'INSERT INTO clientes (nombre, correo) VALUES (?, ?)',
    [nombre, correo],
    function (err) {
      if (err) {
        console.error('❌ Error al insertar cliente:', err.message);
        res.status(500).json({ error: 'Error al guardar cliente' });
      } else {
        console.log('✅ Cliente insertado con ID:', this.lastID);
        res.status(201).json({ id: this.lastID, nombre, correo });
      }
    }
  );
});

module.exports = router;
