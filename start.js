const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const path = require('path');
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport');

// Database
const database = require('./db/db');

const app = express()

// CSS

app.use(express.static(__dirname + '/public'));

// Passport Config

require('./db/passport')(passport);

// EJS Middleware

app.use(expressLayouts);
app.set(path.join(__dirname, './views', 'layout'))
app.set('view engine', 'ejs');

// BodyParser

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Express Session Middleware

app.use(session({
    secret: 'password',
    resave: true,
    saveUninitialized: false
}));

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect Flash

app.use(flash())

// Global Variables

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

// routes

app.use('/', require('./routers/index'))
app.use('/users', require('./routers/users'))

// Mongo
app.use('/productos', require('./routers/product_router_mongo'))
// app.use('/api/productMongo', routerProductsMongo)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

database()