const mongoose = require('mongoose')

class StoreRepoMongo {

    constructor(url, collection, schema) {
        this.url = url
        this.schema = mongoose.model(collection, schema)
    }

    // Conexion a la base de datos de Mongodb
    
    // async connect() {
    //     const rta = await mongoose.connect(this.url)
    //     console.log("Conectado a la base de datos de Mongo");
    // }

    // Gets products

    async getAll() {
        try {
            const productos = await this.schema.find()
            return productos
        } catch(error) {
            throw new Error(`Error mostrando todos los productos: ${error}`)
        }
    }

    // Gets products by id

    async getProduct(id) {
        try {
            const productId = await this.schema.findById(id)
            
            return productId
        } catch(error) {
            throw new Error(`Error mostrando el producto: ${error}`)
        }
    }

    // Insert product in database

    async save(obj) {
        try {
            const producto = new this.schema(obj)
            const result = await producto.save()
            console.log("Producto Creado");

            return result
        } catch(error) {
            throw new Error(`Error guardando el producto: ${error}`)
        }
    }

    // Edit product by id in database

    async editProduct(id, objeto) {
        try {
            const productoEdit = await this.schema.findByIdAndUpdate(id, objeto, { useFindAndModify: false })
            console.log("Producto Editado");

            return productoEdit
        } catch(error) {
            throw new Error(`Error borrando el producto: ${error}`)
        } 
    }

    // Delete product by id in database

    async delete(id){
        try {
            const productoDelete = await this.schema.findByIdAndDelete({ _id: id})
            
            return productoDelete
        } catch(error) {
            throw new Error(`Error borrando el producto: ${error}`)
        }        
    }
}

module.exports = StoreRepoMongo