// Importo el Router
const { Router } = require('express')

//Importo los controladores
const etiquetaController = require('../controllers/etiqueta.controllers')
const {validarEtiqueta, validarEtiquetaId} = require("../middlewares/etiquetas.middlewares")

//Instancio el router
const router = Router()

//Agrego los endpoints
router.get('/', etiquetaController.obtenerEtiquetas)
router.get('/:idEtiqueta', validarEtiquetaId, etiquetaController.obtenerEtiquetaId)
router.post('/',validarEtiqueta, etiquetaController.crearEtiqueta)

// Le digo que se puede exportar
module.exports = router