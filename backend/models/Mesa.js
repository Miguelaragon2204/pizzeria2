const mongoose = require('mongoose');

const mesaSchema = new mongoose.Schema({
    numero: { type: Number, required: true, unique: true },
    estado: { type: String, default: 'Libre' }, 
    orden: [{
        producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
        cantidad: { type: Number, default: 1 }
    }]
});

module.exports = mongoose.model('Mesa', mesaSchema);