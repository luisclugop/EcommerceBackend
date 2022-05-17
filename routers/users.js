const express = require('express');
const { Router } = express
const bcrypt = require('bcryptjs')
const passport = require('passport')

const usersRouter = Router()

// Model New User Mondogb
const Users = require('../models/models');

// Login Page
usersRouter.get('/login', (req, res) => {
    res.render('login')
})

// Register Page
usersRouter.get('/register', (req, res) => {
    res.render('register')
})

// Register Post
usersRouter.post('/register', (req, res) => {
    // console.log(req.body);

    const { username, email, password, password2, direccion, edad, telefono } = req.body;

    let errors = [];

    // Check required fields
    if(!username || !email || !password || !password2 || !direccion || !edad || !telefono) {
        errors.push({ msg: 'Favor de rellenar todos los campos' })
    }

    // Check password match
    if(password !== password2) {
        errors.push({ msg: 'Las contraseñas no son las mismas' })
    }

    // Check password match
    if(password.length < 6) {
        errors.push({ msg: 'La contraseña no puede ser menor a 6 caracteres' })
    }

    // Check password match
    if(errors.length > 0) {
        res.render('register', {
            errors,
            username,
            email,
            password,
            password2,
            direccion,
            edad,
            telefono
        })
    } else {
    // Validation passed
    Users.findOne({ email: email })
        .then(user => {
            if(user) {
                // User exists
                errors.push({ msg: 'El correo ya ha sido registrado'})
                res.render('register', {
                    errors,
                    username,
                    email,
                    password,
                    password2,
                    direccion,
                    edad,
                    telefono
                })
            } else {
                const newUser = new Users({
                    username,
                    email,
                    password
                })

                // console.log(newUser);
                // Hash Password

                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;

                    // Set password to hashed
                    newUser.password = hash;

                    // Save user to mongodb
                    newUser.save()
                        .then(user => {
                            req.flash('success_msg', 'Ahora estás registrado')
                            res.redirect('/users/login')
                        })
                        .catch(err => console.log(err))
                }))
            }
        });
    }
})

// Login Post

usersRouter.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next)
})

// Logout Get

usersRouter.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Has cerrado Sesion')
    res.redirect('/users/login')
})


module.exports = usersRouter