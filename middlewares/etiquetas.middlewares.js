const {Etiqueta} = require("../models")
const schemaEtiqueta = require("../schema/etiqueta.schema.js")

const validarEtiqueta = (req, res, next) => {
    const {error} = schemaEtiqueta.validate(req.body)

    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }
    next()
}

const validarEtiquetaId = async (req, res, next) => {
    const {idEtiqueta} = req.params
    console.log(req.params)
    const etiqueta = await Etiqueta.findByPk(idEtiqueta)
    if (!etiqueta) {
    return res.status(400).json({message: "El id proporcionado no existe"})
    }
    req.etiqueta = etiqueta
    next()
}

module.exports = {
    validarEtiqueta,
    validarEtiquetaId
}