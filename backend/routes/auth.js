const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Registro de usuario
router.post('/registro', async (req, res) => {
  try {
    const { nombre, usuario, contraseña, rol } = req.body;

    // Verificar si el usuario ya existe
    let usuarioExistente = await Usuario.findOne({ usuario });
    if (usuarioExistente) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedContraseña = await bcrypt.hash(contraseña, salt);

    // Crear nuevo usuario
    usuarioExistente = new Usuario({
      nombre,
      usuario,
      contraseña: hashedContraseña,
      rol
    });

    await usuarioExistente.save();
    res.json({ msg: 'Usuario creado correctamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

    // Verificar si el usuario existe
    let usuarioExistente = await Usuario.findOne({ usuario });
    if (!usuarioExistente) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(contraseña, usuarioExistente.contraseña);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    // Crear y asignar token JWT
    const payload = {
      usuario: {
        id: usuarioExistente.id,
        rol: usuarioExistente.rol
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;