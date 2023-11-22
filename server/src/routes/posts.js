// Importa Express y los modelos necesarios
const express = require('express');
const router = express.Router();
const handlers = require('../handlers/posts.js');
const Usuario = require('../models/Usuario');
const Mascota = require('../models/Mascota');
const Publicacion = require('../models/');

// Ruta para crear una nueva publicación
router.post('/', async (req, res) => {
  try {
    const { title, description, address, start_date, end_date, cuidador_id, pet_id, user_id } = req.body;

    const cuidador = await Usuario.findByPk(cuidador_id);
    const mascota = await Mascota.findByPk(pet_id);

    if (!cuidador || !mascota) {
      return res.status(404).json({ error: 'Cuidador o mascota no encontrados' });
    }

    const publicacion = await Publicacion.create({
      title,
      description,
      address,
      start_date,
      end_date,
      cuidador_id,
      pet_id,
      user_id,
    });

    res.json(publicacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la publicación' });
  }
});

// Ruta para obtener todas las publicaciones
router.get('/', async (req, res) => {
  try {
    const publicaciones = await Publicacion.findAll();
    res.json(publicaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las publicaciones' });
  }
});

// Rutas adicionales para manejar otras operaciones con publicaciones
router.post ("/accept/:postId", async (req, res) => {
    try {
        const postId = req.params.postId;
        const { cuidadorId } = req.body;

        const publicacion = await Publicacion.findByPk(postId);

        if (!publicacion) {
            return res.status(404).json({ error: "Publicación no encontrada" });
    }


        if (publicacion.cuidador_id !== cuidadorId) {
            return res.status(403).json({ error: "No tienes permiso para aceptar esta publicación" });
        }

    

        res.json({ success: true, message: 'Publicación aceptada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al aceptar la publicación" });
    }
})
// Exporta las rutas
module.exports = router; 

