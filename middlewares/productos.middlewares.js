const {Producto, Categoria} = require("../models")
const schemaProducto = require("../schema/producto.schema")

const validarProducto = (req, res, next) => {
    const {error} = schemaProducto.validate(req.body)
    if (error) {
        return res.status(400).json({error: error.details[0].message})
    }
    next()
}

const validarProductoIdConCategoria = async (req, res, next) => {
    try {
        const {id} = req.params
        const producto = await Producto.findByPk(id, {
            attributes: ["nombre", "precio", "stock"],
            include: {
                model: Categoria,
                as: "categoria",
                attributes: ["nombre"]
            }
        })
        if (!producto) {
            return res.status(400).json({message: "Producto no encontrado"})
        }

        req.producto = producto
        next()
    } catch {
        res.status(500).json({
            error: "Error al actualizar el Producto"
        })
    }
}

const validarProductoId = async (req, res, next) => {
    try {
        const {id} = req.params
        const producto = await Producto.findByPk(id)
        if (!producto) {
            return res.status(400).json({message: "Producto no encontrado"})
        }

        req.producto = producto
        next()
    } catch {
        res.status(500).json({
            error: "Error al actualizar el Producto"
        })
    }
}

module.export = {
    validarProducto,
    validarProductoId,
    validarProductoIdConCategoria
}