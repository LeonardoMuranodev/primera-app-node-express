const Joi = require("joi")

const schemaCategoria = Joi.object({
    nombre: Joi.string().min(3).max(100).required()
    .messages({
        "string.base": "El nombre debe ser texto",
        "string.empty": "El nombre es obligatorio",
        "string.min": "El nombre debe tener al menos 3 caracteres"
    }),
})


const schemaProducto = Joi.object({
    nombre: Joi.string().min(3).max(100).required()
    .messages({
        "string.base": "El nombre debe ser texto",
        "string.empty": "El nombre es obligatorio",
        "string.min": "El nombre debe tener al menos 3 caracteres"
    }),
    precio: Joi.number().integer().positive().required()
    .messages({
        "number.base": "El precio debe ser un numero",
        "number.positive": "El precio debe ser mayor a cero",
        "any.required": "El precio es obligatorio"
    }),
    stock: Joi.number().integer().min(0).required()
    .messages({
        "number.base": "El stock debe ser un numero",
        "number.positive": "El stock debe ser mayor a cero",
        "any.required": "El stock es obligatorio"
    }),
    categoriaId: Joi.number().integer().positive().required()
    .messages({
        "number.base": "El campo categoriaId debe ser un numero",
        "number.positive": "El campo categoriaId debe ser mayor a cero",
        "any.required": "El campo categoriaId es obligatorio"
    }),
})

module.exports = schemaProducto