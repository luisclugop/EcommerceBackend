// const config = require('../config')
// const mongoose = require('mongoose')
// const LoginAuth = require('../repository/login')

// User = require('../models/models'),

// class LoginAuthMongo extends LoginAuth {
//     constructor() {
//         super(`${config.mongo.url}`, "usuarios", new mongoose.Schema({
//             username: {
//                 type: String, 
//                 require: true,
//                 max: 20
//             },
//             email: {
//                 type: String, 
//                 require: true,
//                 max: 30
//             },
//             password: {
//                 type: String, 
//                 require: true,
//                 max: 15
//             },
//             direccion: {
//                 type: String, 
//                 require: true,
//                 max: 100
//             },
//             edad: Number,
//             telefono: Number,
//             image: {
//                 type: String, 
//                 require: true,
//                 max: 100
//             },
//             role: {
//                 type: String, 
//                 require: true,
//                 max: 100
//             }
//             })
//         )
//         super.connect()
//     }
//     async getAllUsers() {
//         return super.getAllUsers()
//     }
//     async getUser(id) {
//         return super.getUser(id)
//     }
//     async save(obj) {
//         return super.save(obj)
//     }
// }

// module.exports = LoginAuthMongo
