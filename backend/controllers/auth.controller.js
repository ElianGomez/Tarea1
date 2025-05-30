const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'flutter_app_secret'; // Puedes mover esto a una variable de entorno

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.get(`SELECT * FROM usuarios WHERE username = ?`, [username], (err, user) => {
    if (err) return res.status(500).json({ error: 'Error interno del servidor' });

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    return res.json({ message: 'Login exitoso', token });
  });
};

exports.registrarUsuario = (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  db.run(`INSERT INTO usuarios (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE')) {
        return res.status(400).json({ error: 'El usuario ya existe' });
      }
      return res.status(500).json({ error: 'Error al registrar usuario' });
    }

    res.json({ message: 'Usuario registrado', id: this.lastID });
  });
};

