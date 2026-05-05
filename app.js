const express = require('express')

const app = express()

app.use(express.json())

// Importamos la BD, no hace falta poner /index, se hace automatico
const {Producto} = require("./models")
const { where } = require('sequelize')

const PORT = 3000

// get de todos los productos
app.get('/productos', async (req, res) => {
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
})

// get de un solo producto por id
app.get('/productos/:id', async (req, res) => {
    // En vez de romperse la app, responde con un mensaje de error
    try {
        const {id} = req.params
        const producto = await Producto.findByPk(id, {
            attributes: ["nombre", "precio", "stock"]
        })
        //Validamos que no sea null
        if(!producto) {
            return res.status(400).json(producto).json({message: "EL producto no existe"})
        }
        return res.status(200).json(producto)
    } catch (error){
        return res.status(500).json({message: "Error: " + error.message})
    }
})

app.post('/productos', async (req, res) => {
    // En vez de romperse la app, responde con un mensaje de error
    try {
        const {nombre, precio, stock} = req.body
        if(!nombre || precio == null || stock == null) {
            return res.status(400).json({message: "Faltan campos obligatorios"})
        }

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
})

app.put('/productos/:id', async (req, res) => {
    // En vez de romperse la app, responde con un mensaje de error
    try {
        const {id} = req.params

        const {nombre, precio, stock} = req.body
        if(!nombre || precio == null || stock == null) {
            return res.status(400).json({message: "Faltan campos obligatorios"})
        }

        // Importante el await
        const producto = await Producto.update({
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
})

app.delete('/productos/:id', async (req, res) => {
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
})

app.listen(PORT, async () => {

    /* 
    Sincroniza nuestros modelos con la BD de sqlite
    
    Esto es una operacion que devuelve una promesa asio que usamos await y entonces la funcion de la app pasa a hacer asincrona

    Ahi me crea el archivo sqlite la bd, con el modelo de productos y sus campos

    Por defecto me crea campos como id, createAd, y updatedAd
    */
    await Producto.sequelize.sync()
    console.log("La aplicacion corre en el puerto " + PORT)
})