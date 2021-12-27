const express = require('express');
const Contenedor = require('./library/Contenedor.js')
const { Router } = express;

// Conexion Server por Socket
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const router = Router();
const contenedor = new Contenedor(__dirname + "/data/productos.json");
const error = "Producto no encontrado";

// Constantes Server Socket
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
// Constantes Server Socket

const port = process.env.port || 8080;

// Middelwares express
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

contenedor.init();
app.use(express.static('./public'));
app.use('/api/productos', router);
app.use('/api/carrito', router);

// Logica Router
router.get("/", (request, response) => {
    return response.json(contenedor.list)
})

router.get("/:id", (request, response) => {
    let id = request.params.id
    if(id) {
        return response.json(contenedor.find(id))
    } else {
        return error
    }
})

//Insertar un producto por post
router.post("/", (request, response) => {
    let objeto = request.body
    contenedor.insert(objeto)
    console.log("Nuevo producto agregado")
    return response.redirect("/")
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

// app.listen(8080);
// app.listen(port);
// console.log("Corriendo Ecommerce...")

httpServer.listen(port, function() {
    console.log("Corriendo IOServer Proyecto Ecommerce Backend")
})

io.on("connection", (socket) => {
    console.log("Nuevo usuario")
    socket.emit('contenedor', contenedor)
})

io.on("connection", (socket) => {
    // Escuchamos la peticion del index.js en public
    // console.log(data)
    socket.on('new_producto', async (data) => {
        console.log(data)
        await contenedor.insert(data)
        io.sockets.emit('productos', data)
    })
})
