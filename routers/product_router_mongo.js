const express = require('express')
// const { storeMongo } = require('../services/services')
const { Router } = express

// Dao's

const {
    productosDao,
    carritosDao
} = require('../daos/index.js')

const admin = true
const user = true

const routerProductsMongo = Router()

routerProductsMongo.use(express.json())
routerProductsMongo.use(express.urlencoded({ extended: true }))

// Get all products from Mongo

routerProductsMongo.get('/', async (req, res) => {
    let objeto = await productosDao.getAll()

    return res.send(objeto)
})

// Get Product by Params ID on Mongo

routerProductsMongo.get('/:id?', async (req, res) => {
    let objeto = await productosDao.getProduct(req.params.id)

    return res.send(objeto)
})

// Create a new product on Mongo

routerProductsMongo.post('/', async (req, res) => {
    let objeto = req.body
    let result = await productosDao.save(objeto)
    console.log("Nuevo producto agregado");

    return res.send(result)
})

// Edit a product by Id on Mongo

routerProductsMongo.put('/:id', async (req, res) => {
    const id = req.params.id
    let objeto = req.body

    let result = await productosDao.editProduct(id, objeto)
    console.log("Producto Editado correctamente");

    return res.send(result)
})

// Deleted a product by Id on Mongo

routerProductsMongo.delete('/:id', async (req, res) => {
    const id = req.params.id
    let result = await productosDao.delete(id)
    console.log("Producto Eliminado");

    return res.send(result)
})

module.exports = routerProductsMongo