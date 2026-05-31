const {Router} = require("express")
const productosControllers = require("../controllers/productos.controllers")
const {validarProducto, validarProductoId, validarProductoIdConCategoria} = require("../middlewares/productos.middlewares")
const {validarEtiqueta, validarEtiquetaId} = require("../middlewares/etiquetas.middlewares")


const router = Router()

router.get("/", productosControllers.obtenerProductos)
router.get("/:idProducto", validarProductoIdConCategoria, productosControllers.obtenerProducto)
router.post("/", validarProducto, productosControllers.crearProducto)
router.put("/:idProducto", validarProducto, validarProductoId, productosControllers.actualizarProducto)
router.delete("/:idProducto", validarProductoId, productosControllers.eliminarProducto)

router.post("/:idProducto/etiquetas", validarProductoId, productosControllers.asignarEtiquetas)
router.post("/:idProducto/etiquetas/:idEtiqueta", validarProductoId, validarEtiqueta, validarEtiquetaId, productosControllers.asociarEtiqueta)

module.exports = router