const { Categoria,  } = require('../models')
const schemaCategoria = require("../schema/categoria.schema")

const validarCategoria = (req, res, next) => {
    const {error} = schemaCategoria.validate(req.body)
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }
    next()
}

const validarCategoriaId = async (req, res, next) => {
    const {id} = req.params
    const categoria = await Categoria.findByPk(id)
    if (categoria) {
        req.categoria = categoria
        next()
    }
    return res.status(400).json({message: `El id: ${id} no es valido`}) 
}

module.exports = {
    validarCategoria,
    validarCategoriaId
}