const mongoose = require('mongoose')

class LoginAuth {

    constructor(url, collection, schema) {
        this.url = url
        this.schema = mongoose.model(collection, schema)
    }

    // Conexion a la base de datos de Mongodb
    
    async connect() {
        const rta = await mongoose.connect(this.url)
        console.log("Conectado a la base de datos de Mongo desde login");
    }

    // Gets all users in Mongodb

    async getAllUsers() {
        try {
            const usuarios = await this.schema.find()
            return usuarios
        } catch(error) {
            throw new Error(`Error mostrando todos los usuarios: ${error}`)
        }
    }

    // Gets user by id

    async getUser(id) {
        try {
            const userId = await this.schema.findById(id)
            
            return userId
        } catch(error) {
            throw new Error(`Error mostrando el producto: ${error}`)
        }
    }

    // Create new user in Mongodb

    async save(obj) {
        try {
            const usuario = new this.schema(obj)
            const result = await usuario.save()
            console.log("Usuario Creado Exitosamente");

            return result
        } catch(error) {
            throw new Error(`Error creando el usuario: ${error}`)
        }
    }

}

module.exports = LoginAuth