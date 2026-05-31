const { Producto, Categoria, Etiqueta } = require('../models')

const obtenerProductos = async (req, res) => {
    // En vez de romperse la app, responde con un mensaje de error
    try {
        const productos = await Producto.findAll({
            //Solo devuelve estos tres campos
            attributes: ["nombre", "precio", "stock"],
            include: [
                {
                    model: Categoria,
                    as: "categoria",
                    attributes: ["nombre"]
                }, {
                    model: Etiqueta,
                    as: "etiquetas",
                    attributes: ["nombre"],
                    through: {
                        attributes: [],
                    },
                },
            ]
        })

        if (productos.length === 0) {
            return res.status(200).json({ message: "Aún no hay productos registrados en la base de datos." })
        }

        const respuesta = productos.map(p => {
            const prodPlain = p.toJSON() // Lo pasamos a objeto plano JS
            return {
                nombre: prodPlain.nombre,
                precio: prodPlain.precio,
                stock: prodPlain.stock,
                // Si existe el objeto categoria, usamos su nombre. Si es null, mostramos el default
                categoria: prodPlain.categoria ? prodPlain.categoria.nombre : "Sin Categoria",
                etiquetas: prodPlain.etiquetas.length == 1 ? prodPlain.etiquetas[0].nombre : prodPlain.etiquetas.map(etiqueta => etiqueta.nombre)
            }
        })

        return res.status(200).json(respuesta)
    } catch (error){
        return res.status(500).json({message: "Error: " + error.message})
    }
}

// No interactuo con la BD, le saco el try y catch y el async ya que no es necesario
const obtenerProducto = (req, res) => {
    const {id} = req.params

    const prodPlain = req.producto.toJSON()
    
    const respuesta = {
        nombre: prodPlain.nombre,
        precio: prodPlain.precio,
        stock: prodPlain.stock,
        categoria: prodPlain.categoria ? prodPlain.categoria.nombre : "Sin Categoria"
    }

    return res.status(200).json(producto)
}

const crearProducto = async (req, res) => {
    // En vez de romperse la app, responde con un mensaje de error
    try {
        const {nombre, precio, stock, categoriaId} = req.body
        // Importante el await


        const producto = await Producto.create( {
            nombre,
            precio,
            stock,
            categoriaId
        })

        const categoria = await Producto.findByPk(categoriaId)

        return res.status(201).json({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            stock: producto.stock,
            categoria: categoria.nombre || "Sin categoria"
        })
    } catch {
        return res.status(500).json({message: "Error a la hora de crear el producto"})
    }
}

const actualizarProducto = async (req, res) => {
    // En vez de romperse la app, responde con un mensaje de error
    try {
        const {id} = req.params
        const {nombre, precio, stock, categoriaId} = req.body
        const producto = req.producto
        // Importante el await
        await Producto.update({
            nombre,
            precio,
            stock,
            categoriaId
        }, {
            where: {
                id
            }
        })
        return res.status(200).json({message: "Producto actualizado con exito"})
    } catch {
        return res.status(500).json({message: "Error a la hora de crear el producto"})
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

        return res.status(200).json({message: "Producto eliminado con exito"})
    } catch {
        return res.status(500).json({message: "Error a la hora de eliminar el producto"})
    }
}

const asignarEtiquetas = async (req, res) => {
    try {
        //Obtengo array de isd de etiquetas
        const {etiquetasId} = req.body

        //Lo obtengo de validarProductoId: middleware
        const producto = req.producto

        //Obtengo las etiquetas que me mando por el array
        const etiquetas = await Etiqueta.findAll({
            where: {
                id: etiquetasId
            }
        })

        // Agrega todos los registros con el id del producto y una por cada id de etiqueta
        await producto.setEtiquetas(etiquetas)

        return res.status(201).json({message:"Etiquetas asignadas con exito al producto"})
    } catch {
        return res.status(500).json({message: "Error a la hora de asignarle las etiquetas a el producto"})
    }
}

const asociarEtiqueta =  async (req, res) => {
    try {
        const etiqueta = req.etiqueta;
        const producto = req.producto;

        // Agrega todos los registros con el id del producto y una por cada id de etiqueta
        await producto.addEtiqueta(etiqueta)

        return res.status(201).json({message:`Etiqueta asignada con exito al producto:`})
    } catch (error) {
        return res.status(500).json({message: `Error a la hora de asignarle las etiquetas a el producto: ${error.message}`})
    }
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    asignarEtiquetas,
    asociarEtiqueta
}