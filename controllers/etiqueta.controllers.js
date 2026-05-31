//Importo los modelos necesarios, tambien producto por los JOINS
const { Etiqueta, Producto } = require('../models')

//Creo los controladores
const obtenerEtiquetas = async (req,res) => {
    try {
        const etiquetas = await Etiqueta.findAll({
            attributes: ["nombre"],
        })

        if (etiquetas.length === 0) {
            res.status(200).json("No hay etiquetas")
        }

        res.status(200).json(etiquetas.map(etiqueta => etiqueta.nombre))
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const obtenerEtiquetaId = (req, res) => {
    try {
        const etiqueta = req.etiqueta

        res.status(200).json(etiqueta)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const crearEtiqueta = async (req,res) => {
    try {
        const { nombre } = req.body
        const etiqueta = await Etiqueta.create({
            nombre
        })
        res.status(201).json(etiqueta)
    } catch (error) {
        res.status(500).json({
            error: "Error al crear la etiqueta"
        })
    }
}

// Exporto un objeto con cada funcion
module.exports = {
    obtenerEtiquetas,
    obtenerEtiquetaId,
    crearEtiqueta
}