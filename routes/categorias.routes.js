// Importo el Router
const { Router } = require('express')

//Importo los controladores
const categoriaController = require('../controllers/categoria.controllers')
const {validarCategoria, validarCategoriaId} = require("../middlewares/categorias.middlewares")

//Instancio el router
const router = Router()

//Agrego los endpoints
router.get('/', categoriaController.obtenerCategorias)
router.get('/:id', validarCategoriaId,categoriaController.obtenerCategoria)
router.post('/', validarCategoria, categoriaController.crearCategoria)
router.put('/:id', validarCategoria, validarCategoriaId, categoriaController.actualizarCategoria)
router.delete('/:id', categoriaController.eliminarCategoria)

// Le digo que se puede exportar
module.exports = router