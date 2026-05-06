// Importo el Router
const { Router } = require('express')

//Importo los controladores
const categoriaController = require('../controllers/categoria.controllers')
const {validarCategoria} = require("../middlewares/categorias.middlewares")

//Instancio el router
const router = Router()

//Agrego los endpoints
router.get('/', categoriaController.obtenerCategorias)
router.post('/', validarCategoria, categoriaController.crearCategoria)
router.delete('/', categoriaController.eliminarCategoria)

// Le digo que se puede exportar
module.exports = router