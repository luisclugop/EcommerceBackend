const mongoose = require('mongoose');
const config = require('../config')

const database = () => {
    mongoose
        .connect(config.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then( ()=> console.log('Conexion Exitosa a Mongodb')
        )
    }

module.exports = database