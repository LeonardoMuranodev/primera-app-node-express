const express = require('express')
const app = express()
const db = require('./models')

// Importacion de los routers
const routerProductos = require('./routes/productos.routes')
const routerCategoria = require('./routes/categorias.routes')
const PORT = 3000

app.use(express.json())

//Le agregamos a app los routers con prefijos
app.use('/productos',  routerProductos)
app.use('/categorias', routerCategoria)

app.listen(PORT, async () =>{
    await db.sequelize.sync()
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})