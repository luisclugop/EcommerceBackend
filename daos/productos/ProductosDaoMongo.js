// const routerProductsMongo = require('../../routers/product_router_mongo');
const StoreRepoMongo = require('../../repository/store_mongo')
const config = require('../../config.js')
const mongoose = require('mongoose');

// const { Schema } = mongoose;

// // Esquema de Producto __
// const ProductoSchema = new mongoose.Schema({
//     timestamp: {
//         type: Date,
//         require: true
//     },
//     nombre: {
//         type: String, 
//         require: true,
//         max: 100
//     },
//     descripcion: {
//         type: String, 
//         require: true,
//         max: 100
//     },
//     codigo: Number,
//     foto: {
//         type: String, 
//         require: true,
//         max: 100
//     },
//     precio: Number,
//     stock: Number
// })

// const Producto = mongoose.model('Producto', ProductoSchema)

// Fin Esquema de Producto __

class ProductosDaoMongo extends StoreRepoMongo {
    constructor() {
        super(`${config.mongo.url}`, "productos", new mongoose.Schema({
                timestamp: {
                    type: Date,
                    require: true
                },
                nombre: {
                    type: String, 
                    require: true,
                    max: 100
                },
                descripcion: {
                    type: String, 
                    require: true,
                    max: 100
                },
                codigo: {
                    type: String, 
                    require: true,
                    max: 10
                },
                foto: {
                    type: String, 
                    require: true,
                    max: 100
                },
                precio: Number,
                stock: Number
            })
        )
        // super.connect()
    }
    async getAll() {
        return super.getAll()
    }
    async getProduct(id) {
        return super.getProduct(id)
    }
    async save(obj) {
        return super.save(obj)
    }
    async delete(id) {
        return super.delete(id)
    }
    
}

module.exports = ProductosDaoMongo