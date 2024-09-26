const express = require('express');
const router = express.Router();
const Mesa = require('../models/Mesa');
const auth = require('../middleware/auth');

// Obtener todas las mesas 
router.get('/', auth, async (req, res) => {
  try {
    const mesas = await Mesa.find().populate('orden.producto'); // Obtiene los detalles del producto en la orden
    res.json(mesas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
  
});

router.put('/:id', auth, async (req, res) => {
    try {
      const id = req.params.id;
      const { estado, orden } = req.body; 
  
      const mesa = await Mesa. findByIdAndUpdate(id, { estado, orden }, { new: true });
  
      res.json(mesa);
    } catch (error) {
      console.error('Error al actualizar la mesa:', error);
      res.status(500).json({ message: 'Error al actualizar la mesa' });
    }
  });
  module.exports = router;