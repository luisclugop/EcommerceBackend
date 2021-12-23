const express = require('express');
const Contenedor = require('./library/Contenedor.js')
const { Router } = express;

const router = Router();
const contenedor = new Contenedor(__dirname + "/data/productos.json");
const error = "Producto no encontrado";

const app = express();
// Middelwares express
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/api/productos', router);
app.use('/api/carrito', router);

router.get("/", (request, response) => {
    return response.json(contenedor.list)
})

router.get("/:id", (request, response) => {
    let id = request.params.id
    return response.json(contenedor.find(id))
})

//Insertar un producto por post
router.post("/", (request, response) => {
    let objeto = request.body
    contenedor.insert(objeto)
    console.log("Nuevo producto agregado")
    return response.redirect("/list")
})

//Editar un producto de nuestra lista
router.put("/:id", (request, response) => {
    let objeto = request.body
    let id = request.params.id
    return response.json(contenedor.update(id, objeto))
})

//Elimina un producto de nuestra lista
router.delete("/:id", (request, response) => {
    let id = request.params.id
    return response.json(contenedor.delete(id))
})

app.listen(8080);
console.log("Corriendo Ecommerce...")
