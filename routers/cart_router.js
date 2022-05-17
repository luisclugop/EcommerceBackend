const express = require('express')
const {
    store,
    bussiness,
    addProductToCart
} = require('../services/services')

// Configuracion Usuarios
const config = require('../config/config')

function soloAdmins(request, response, next) {
    if(!config.admin && request.headers.admin) {
        response.status(401).send("La ruta y el metodo no estan autorizados")
    } else {
        next()
    }
}

const { Router } = express

const routerCart = Router()

routerCart.use(express.json())
routerCart.use(express.urlencoded({ extended:true }))

// Crear un carrito
// routerCart.post('/', (request, response) => {
//     if(config.admin && request.headers.admin){
//         let cart = bussiness.createCart()

//         return response.send(cart)
//     } else {
//         return response.status(401).send("No auth")
//     }
// })

routerCart.post('/', soloAdmins, (request, response) => {
    const cart = bussiness.createCart()

    return response.send(cart)
})

// Agregar articulos al carrito por id
routerCart.post('/:id/products', (request, response) => {
    const idCart = request.params.id
    const idProduct = request.body.id

    let results = addProductToCart(idCart, idProduct)

    return response.send(results)
})

// Ver carritos por Id
routerCart.get('/:id/products', (request, response) => {
    const idCart = request.params.id

    let results = bussiness.getProducts(idCart)

    return response.send(results)
})

// Borrar carrito
routerCart.delete('/:id', (request, response) => {
    const cartDelete = request.params.id;
    // console.log(cartDelete);

    let results = bussiness.deleteCart(cartDelete)

    return response.send(results)

});

// Borrar producto dentro del carrito
routerCart.delete('/:id/products/:idProd', (request, response) => {
    const cartIdDelete = request.params.id;
    const cartProductDelete = request.params.idProd;

    let results = bussiness.deleteProductCart(cartIdDelete, cartProductDelete)

    return response.send(results)

});

module.exports = routerCart