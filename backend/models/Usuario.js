const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    usuario: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true }, 
    rol: { type: String, enum: ['Cajero', 'Camarero'], required: true }
});

module.exports = mongoose.model('Usuario', usuarioSchema);