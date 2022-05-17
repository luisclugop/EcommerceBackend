const mongoose = require('mongoose'),
passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    password2: String,
    direccion: String,
    edad: Number,
    telefono: Number
    // image: String,
    // role: String
});

// añadimos todas las características de passport a nuestro schema
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);