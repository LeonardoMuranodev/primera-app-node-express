# ORM y Sequelize

Para trabajar con un ORM, además de instalar el mismo, debemos bajar el motor de la base de datos. En este caso, debemos instalar `sequelize` y además `sqlite3`.

## Dependencias vs. Dependencias de Desarrollo (DevDependencies)

Si al instalar un paquete ejecuto el siguiente comando, lo voy a bajar como una dependencia del lado de desarrollo:

```bash
npm i -D nodemon
```

## Sequelize CLI

Es una herramienta que nos permite hacer cosas ya prearmadas, como:
* Iniciar un proyecto.
* Llenar algunas bases de datos con datos de ejemplo.
* Ejecutar migraciones para modificar o crear tablas.

No la necesitamos en producción; es algo que nos ayuda a ciertas cosas en el desarrollo, por lo que podemos instalarla con `-D`.

## Scripts Semánticos en `package.json`

* **`start`**: debería ser cuando la quiero ejecutar en producción, por lo que ya no voy a usar `nodemon`, sino `node` normal.
* **`dev`**: ahí sí usamos `nodemon`.

```json
"scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
}
```

Pero al poner en la terminal `npm dev` no nos va a dejar, ya que `dev` no es un comando nativo (como sí lo es `start`). Así que debemos usar la palabra `run`:

```bash
npm run dev
```

## Diferencias entre `npm` y `npx`

* **`npm`**: es para *instalar* paquetes.
* **`npx`**: es para *ejecutar comandos* de un paquete.

---

## Creación de un proyecto con Sequelize CLI

Para iniciar la estructura base, ejecutamos el siguiente comando: 

```bash
npx sequelize-cli init
```

Esto nos genera las siguientes carpetas:
* `config/`
* `models/`
* `migrations/`
* `seeders/`

### Carpeta `config`

Es la carpeta que me permite conectarme a la base de datos (dentro está `config.json`).
* El **`dialect`** es el motor. En nuestro caso, lo cambiamos a `"sqlite"`.
* En SQLite no necesito `username`, ni `password`, ni `host`.
* Solo dejo la base de datos (`database`) y el **`storage`**, que sería la ruta donde va a estar guardado el archivo físico de la BD.

Aquí tengo varios entornos: `development` (desarrollo), `test` y `production` (producción). Podemos editarlos según el que vayamos a usar.

### Carpeta `models`

Es donde van a estar todos los modelos o tablas de la BD. Con el siguiente comando puedo crear los archivos de un modelo, ya automatizado:

```bash
npx sequelize-cli model:generate --name Producto --attributes nombre:string,precio:float,stock:integer
```
*(Nota: El comando no debe tener espacios después de las comas en los atributos).*

Aquí vamos a tener todos los modelos que creemos, pero también tenemos un archivo `index.js`, el cual se encarga de importar todos los modelos automáticamente.

### Archivo del modelo (`producto.js`)

Como vemos, se genera una clase, ya que **cada clase será una tabla en SQL**.

* En el método **`associate`**, irán los campos que serán FK (Foreign Keys) de otras tablas; por acá se establece la relación.
* En **`Producto.init()`** tenemos todos los campos (atributos) de esa tabla.

*(Dato sobre JS: El `'use strict'` en JavaScript tiene algunas restricciones, como por ejemplo, no podemos declarar una variable sin poner `let` o `const`)*.

---

## Creando nuestra API que interactúa con la BD

### GET de todos los productos --> Obtener de la BD

Se hace con el método `findAll()`. Dentro del método podemos pasar un objeto con varias propiedades:
* **`where`**: condiciones (filtros).
* **`attributes`**: los campos específicos que queremos obtener.
* **`order`**: ordenamiento.
* **`limit`**: límite de resultados.
* **`offset`**: desde dónde empezar a traer (paginación).

Devuelve un array de objetos, donde cada objeto es un registro de la BD.

### GET de un solo producto --> Obtener de la BD

Hay dos maneras de hacerlo:

La primera se hace con el método **`findOne()`**. Funciona igual que `findAll()` (le pasamos propiedades como `where`), pero devuelve el **primer objeto** que cumple con la condición de la BD.

```javascript
const { idProducto } = req.params;
const producto = await Producto.findOne({
    where: {
        id: idProducto
    }
});
```

Pero para buscar por ID hay una mejor manera, la cual se hace con el método **`findByPk(<id>)`** (Find By Primary Key), al cual solo le pasamos el id directamente:

```javascript
const { id } = req.params;
const producto = await Producto.findByPk(id);
```
*(A este método también le puedo pasar un segundo parámetro, el cual es un objeto igual al de `findAll()`, para poder limitar los atributos).*

### POST --> Crear nuevo producto en la BD

Se hace con el método **`create(<objeto>)`**. Le tengo que pasar un objeto donde las propiedades tienen que coincidir con los atributos de ese modelo.
Además de hacer el `INSERT` en la BD, este método me devuelve la fila que acaba de ser insertada.

### PUT --> Actualizar un producto en la BD

Se hace con el método **`update()`**. Le paso dos objetos: el primero con los nuevos valores, y el segundo con las condiciones.

```javascript
Producto.update(
    { nombre_campo: "nuevo valor", precio: 100 }, // Qué quiero actualizar
    { where: { id: 1 } }                          // A quién quiero actualizar
)
```

### DELETE --> Eliminar un producto en la BD

Tarea: implementar el delete.

---
---

## 🛠️ Observaciones y Consejos sobre tu código (`app.js`)

Revisando el código que construiste, hiciste un excelente trabajo implementando las operaciones. Aquí te dejo algunos detalles puntuales para mejorarlo:

**1. Cuidado con los métodos encadenados en las respuestas**
En tu ruta de `GET /productos/:id`, cuando el producto no existe, tienes esta línea:
```javascript
return res.status(400).json(producto).json({message: "EL producto no existe"})
```
Esto te va a dar un error de Express porque estás intentando enviar la respuesta (`.json()`) dos veces. Debería quedar simplemente así (además, el código `404` es más semántico para un "No encontrado"):
```javascript
return res.status(404).json({message: "El producto no existe"})
```

**2. Importaciones sin uso**
En la línea 9 de tu `app.js` tienes:
```javascript
const { where } = require('sequelize')
```
Puedes borrar esta línea. Cuando usas `where: { id }` en tus consultas de Sequelize, es simplemente la propiedad de un objeto en JavaScript; no necesitas importar la palabra `where` de la librería.

**3. Sincronización de la base de datos**
Al final de tu archivo haces `await Producto.sequelize.sync()`. Esto funciona perfecto ahora porque tienes un solo modelo. Sin embargo, a medida que agregues más tablas (usuarios, ventas, etc.), vas a querer sincronizar todo de golpe. Para hacerlo, puedes importar el objeto principal `db` y sincronizar desde ahí:
```javascript
// Arriba importas la base de datos completa:
const db = require('./models'); 

// Abajo en el listen sincronizas todo:
await db.sequelize.sync();
```

**4. Buenas prácticas en el `catch`**
En tus métodos `POST`, `PUT` y `DELETE` utilizaste un bloque `catch` vacío: `catch { res.status(...) }`. Aunque en versiones modernas de Node esto es válido, siempre es mejor atrapar el error: `catch (error) { ... }`. De esta forma, si algo falla, puedes hacer un `console.log(error)` en tu terminal y saber rápidamente si falló la base de datos, si te faltó un dato, etc.

## JOI

Es una libreria para validaciones

Tenemos que validar un schema que vamos a crear

Luego hacemos:

const {error, value} = schema.validate(datos)

Nos devuleve el error, y el value, esteultimo no nos importa mucho

Puede ser que haya muchos errores en una sola validacion, entonces error.details va a hacer un array, con mas de un error

Value sirve por si hay un error de algun campo, y si es pasa, damos un valor por defecto, entonces JOI nos va a devolver el objeto con ese valor por defecto

Ahi si nos importa el VALUE