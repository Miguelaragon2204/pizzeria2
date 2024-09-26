const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');
const auth = require('../middleware/auth');

// Obtener todos los productos
router.get('/', auth, async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
});

// Crear un nuevo producto
router.post('/', auth, async (req, res) => {
  try {
    const { nombre, precio, categoria } = req.body;

    const producto = new Producto({
      nombre,
      precio,
      categoria
    });

    await producto.save();
    res.json({ msg: 'Producto creado correctamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
});

// Obtener un producto por ID
router.get('/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
});

// Actualizar un producto
router.put('/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, precio, categoria } = req.body;

    const producto = await Producto.findByIdAndUpdate(id, {
      nombre,
      precio,
      categoria
    }, { new: true });

    if (!producto) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }
    res.json({ msg: 'Producto actualizado correctamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
});

// Eliminar un producto
router.delete('/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    await Producto.findByIdAndRemove(id);
    res.json({ msg: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;