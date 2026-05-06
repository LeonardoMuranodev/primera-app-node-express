// Importo el Router
const { Router } = require('express')

//Importo los controladores
const categoriaController = require('../controllers/categoria.controllers')

//Instancio el router
const router = Router()

//Agrego los endpoints
router.get('/', categoriaController.obtenerCategorias)
router.post('/', categoriaController.crearCategoria)

// Le digo que se puede exportar
module.exports = router