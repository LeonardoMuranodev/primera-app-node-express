//Importo los modelos necesarios, tambien producto por los JOINS
const { Categoria, Producto } = require('../models')

//Creo los controladores
const obtenerCategorias = async (req,res) => {
    try {
        const categorias = await Categoria.findAll({
            attributes: ["nombre"],
        })
        res.status(200).json(categorias)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const obtenerCategoria = (req, res) => {
    try {
        const {id} = req.params
        const categoria = req.categoria
        res.status(200).json(categoria)
    } catch (error){
        res.status(500).json({
            error: error.message
        })
    }
}

const crearCategoria = async (req,res) => {
    try {
        const { nombre } = req.body
        const categoria = await Categoria.create({
            nombre
        })
        res.status(201).json(categoria)
    } catch (error) {
        res.status(500).json({
            error: "Error al crear el categoria"
        })
    }
}

const actualizarCategoria = async (req, res) => {
    try {
        const {id} = req.params
        const {nombre} = req.body // Extraemos el nombre del body validado por Joi

        await Categoria.update(
            { nombre }, 
            { where: { id } }
        )
        res.status(200).json({message: "Categoría actualizada con éxito"})
    } catch (error) {
        res.status(500).json({error: "Error al actualizar"})
    }
}

const eliminarCategoria = async (req,res) => {
    // En vez de romperse la app, responde con un mensaje de error
    try {
        const {id} = req.params

        // Importante el await
        const totalEliminados = await Categoria.destroy({
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

//Creo los controladores
/*
const obtenerCategoriasConProductos = async (req,res) => {
    try {
        const categorias = await Categoria.findAll({
            attributes: ["nombre"],
            include: {
                model: Producto,
                as: "productos",
                attributes: ["nombre", "precio", "stock"]
            }
        })
        res.status(200).json(categorias)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
*/
// Exporto un objeto con cada funcion
module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
}