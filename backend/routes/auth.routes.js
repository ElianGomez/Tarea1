const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// POST /api/login
router.post('/', authController.login);
router.post('/register', authController.registrarUsuario);

module.exports = router;
