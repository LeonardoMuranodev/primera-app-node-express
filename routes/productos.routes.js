const {Router} = require("express")
const productosControllers = require("../controllers/productos.controllers")
const {validarProducto, validarProductoId, validarProductoIdConCategoria} = require("../middlewares/productos.middlewares")

const router = Router()

router.get("/", productosControllers.obtenerProductos)
router.get("/:id", validarProductoIdConCategoria, productosControllers.obtenerProducto)
router.post("/", validarProducto, productosControllers.crearProducto)
router.put("/:id", validarProducto, validarProductoId, productosControllers.actualizarProducto)
router.delete("/:id", validarProductoId, productosControllers.eliminarProducto)

module.export = router