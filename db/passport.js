const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Model New User Mondogb
const Users = require('../models/models');



module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match user
            Users.findOne({ email: email })
                .then(user => {
                    if(!user) {
                        return done(null, false, { message: 'El email no está registrado' });
                    }

                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'La contraseña es incorrecta'})
                        }
                    });
                })
                .catch(err => console.log(err))
        })
    );

    // Retornar el user.id
    passport.serializeUser( (user, done) => {
        done(null, user._id)
    })

    // Retornar el usuario
    passport.deserializeUser( (id, done) => {
        Users.findById(id, (err, user) => {
            done(err, user)
        })
    })

}