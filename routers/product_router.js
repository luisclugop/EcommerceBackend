const express = require('express')
const { Router } = express

// Dao's

const {
    productosDao,
    carritosDao
} = require('../daos/index.js')

const admin = true
const user = true

const routerProducts = Router()

routerProducts.use(express.json())
routerProducts.use(express.urlencoded({ extended: true }))

// Rutas con funciones en Memoria -------------------------

// routerProducts.get('/', (request, response) => {
//     return response.send(store)
// })

// routerProducts.get('/:id?', (req, res) => {
//     if(admin && req.headers.admin){
//        let id = req.params.id || null

//         let results = store.getProduct(id) || {}

//         return res.send(results) 
//     } else if(user && req.headers.user){
//         let id = req.params.id || null

//         let results = store.getProduct(id) || {}

//         return res.send(results)
//     }else {
//         return res.status(401).send("No auth") 
//     }
    
// })

// routerProducts.post('/', (req, res) => {
//     if(admin && req.headers.admin){
//         const product = req.body

//         store.addProduct(product)

//         return res.send(product)
//     } else {
//         return res.status(401).send("No auth")
//     }
    
// })

// Upload Product

// routerProducts.put('/:id', (req, res) => {
//     if(admin && req.headers.admin){
//         let id = req.params.id
//         const productEdit = req.body
//         console.log(id);
//         console.log(productEdit);

//         let result = store.updateProduct(id, productEdit)

//         return res.send(result)
//     } else {
//         return res.status(401).send("No auth")
//     }
    
// })

// // Delete Product

// routerProducts.delete('/:id', (req, res) => {
//     if(admin && req.headers.admin){
//         let productDelete = req.params.id;
//         // console.log(productDelete);

//         let results = store.deleteProduct(productDelete)

//         return res.send(results)
//     } else {
//         return res.status(401).send("No auth")
//     }
// });

// Rutas con funciones en Memoria -------------------------

// Rutas con funciones en Archivo -------------------------

// Get all from file json

routerProducts.get('/', async (req, res) => {
    let objeto = await productosDao.getAll()

    return res.send(objeto)
})

// Create file json, add Product to File

routerProducts.post('/', async (req, res) => {
    let objeto = req.body
    let result = await productosDao.save(objeto)
    console.log("Nuevo producto agregado");

    return res.send(result)
})

// Get Product by Params ID

routerProducts.get('/:id?', async (req, res) => {
    let objeto = await productosDao.getProduct(req.params.id)

    return res.send(objeto)
})

// Upload Product

routerProducts.put('/:id?', async (req, res) => {
    let id = req.params.id
    let objeto = req.body
    let result = await productosDao.updateProduct(id, objeto)

    // console.log(id);
    // console.log(objeto);

    return res.send(result)
})

// Delete Product

routerProducts.delete('/:id', async (req, res) => {
    let id = req.params.id;
    let result = await productosDao.deleteProduct(id)

    return res.send(result)
});


module.exports = routerProducts

// Rutas con funciones en Archivo -------------------------