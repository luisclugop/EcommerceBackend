const express = require('express');
const { Router } = express
const { ensureAuthenticated } = require('../db/auth')

const routerIndex = Router()

// Index Page
routerIndex.get('/', (req, res) => {
    // res.send('Welcome to index')
    res.render('index')
})

// Perfil page - ensureAuthenticated Protege la pagina con la sesion
routerIndex.get('/profile', ensureAuthenticated, (req, res) => {
    // res.send('Welcome to index')
    res.render('profile', {
        name: req.user.username
    })
})

module.exports = routerIndex