const { Producto } = require('../models')

const obtenerProductos = async (req, res) => {
    // En vez de romperse la app, responde con un mensaje de error
    try {
        const productos = await Producto.findAll({
            //Solo devuelve estos tres campos
            attributes: ["nombre", "precio", "stock"]
        })
        return res.status(200).json(productos)
    } catch (error){
        return res.status(500).json({message: "Error: " + error.message})
    }
}

// No interactuo con la BD, le saco el try y catch y el async ya que no es necesario
const obtenerProducto = (req, res) => {
    const {id} = req.params
    const producto = req.producto
    return res.status(200).json(producto)
}

const crearProducto = async (req, res) => {
    // En vez de romperse la app, responde con un mensaje de error
    try {
        const {nombre, precio, stock} = req.body
        // Importante el await
        const producto = await Producto.create( {
            nombre,
            precio,
            stock
        })
        res.status(201).json(producto)
    } catch {
        res.status(500).json({message: "Error a la hora de crear el producto"})
    }
}

const actualizarProducto = async (req, res) => {
    // En vez de romperse la app, responde con un mensaje de error
    try {
        const {id} = req.params
        const {nombre, precio, stock} = req.body
        const producto = req.producto
        // Importante el await
        await Producto.update({
            nombre,
            precio,
            stock
        }, {
            where: {
                id
            }
        })
        res.status(200).json({message: "Producto actualizado con exito"})
    } catch {
        res.status(500).json({message: "Error a la hora de crear el producto"})
    }
}

const eliminarProducto = async (req, res) => {
    // En vez de romperse la app, responde con un mensaje de error
    try {
        const {id} = req.params

        // Importante el await
        const totalEliminados = await Producto.destroy({
            where: {
                id
            }
        })
        if(totalEliminados == 0) {
            return res.status(200).json({message: "No se eliminaron productos "})
        }

        res.status(200).json({message: "Producto eliminado con exito"})
    } catch {
        res.status(500).json({message: "Error a la hora de eliminar el producto"})
    }
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}