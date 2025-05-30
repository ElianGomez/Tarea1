const db = require('../models');

// Obtener todos los clientes
exports.getClientes = (req, res) => {
  console.log("🟢 GET /api/clientes invocado"); // ✅
  db.all('SELECT * FROM clientes', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener clientes' });
    res.json(rows);
  });
};

// Crear cliente
exports.createCliente = (req, res) => {
  const { nombre, correo } = req.body;
  db.run('INSERT INTO clientes (nombre, correo) VALUES (?, ?)', [nombre, correo], function (err) {
    if (err) return res.status(500).json({ error: 'Error al crear cliente' });
    res.json({ id: this.lastID, nombre, correo });
  });
};

// Actualizar cliente
exports.updateCliente = (req, res) => {
  const { id } = req.params;
  const { nombre, correo } = req.body;
  db.run('UPDATE clientes SET nombre = ?, correo = ? WHERE id = ?', [nombre, correo, id], function (err) {
    if (err) return res.status(500).json({ error: 'Error al actualizar cliente' });
    res.json({ message: 'Cliente actualizado' });
  });
};

// Eliminar cliente
exports.deleteCliente = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM clientes WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: 'Error al eliminar cliente' });
    res.json({ message: 'Cliente eliminado' });
  });
};
