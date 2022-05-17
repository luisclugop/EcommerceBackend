const express = require('express');
const session = require('express-session');
const { Router } = express
const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;;
const loginFunctions = require('../login_functions')
// const config = require('../db/db')

// Dao Login Mongodb

// const LoginAuthMongo = require('../daos/loginDao')
// const loginAuthMongo = new LoginAuthMongo()

// Model New User Mondogb
const Users = require('../models/models');

// Session
passport.use('login', new LocalStrategy(
    (email, password, done) => {

        Users.findOne({ email }, (err, user) => {
            if(err) {
                return done(err)
            }

            if(!user) {
                console.log('No se encontró el email: ' + email);
                return done(null, false)
            }

            return done(null, user)
        })
    }
))

passport.use('register', new LocalStrategy( (req, email, password, done) => {

    Users.findOne({ email: email }, (err, user) => {
        if (err) {
            // return done(err);
            return console.log("Error general" + err);
        }
        if (!user) {
            // console.log(user);
            // return done(null, false, { message: 'Incorrect username.' });
            return console.log("Error de user" + user);
        }
        if (!user.validPassword(password)) {
            // return done(null, false, { message: 'Incorrect password.' });
            return console.log("Error general de contrasena");
        }

        console.log('Estas aqui');
        return done(null, user);

    })
}))



// Router
const routerLogin = Router()

// Express
routerLogin.use(express.urlencoded({extended: true}))

// Configuración de passport

routerLogin.use(require('express-session')({
    secret: 'password',
    resave: false,
    saveUninitialized: false
 }));

// routerLogin.use(session({
//     secret: 'password',
//     resave: false,
//     saveUninitialized: false
// }));

// Inicializamos el passport
routerLogin.use(passport.initialize())
routerLogin.use(passport.session())

// passport.use(new LocalStrategy(Users.authenticate()));

// Retornar el user.id
passport.serializeUser( (user, done) => {
    done(null, user._id)
})

// Retornar el usuario
passport.deserializeUser( (id, done) => {
    Users.findById(id, done)
})

routerLogin.use((req, res, next) => {
    // res.locals.currentUser = req.user;
    next();
}); //le pasamos a nuestro express el usuario de manera global

routerLogin.use(express.json())
routerLogin.use(express.urlencoded({ extended: true }))

// Routes by login_Functions

// routerLogin.get('/', (req, res) => {
//     res.send('Hola index')
// })

// routerLogin.get('/', loginFunctions.getRoot)
routerLogin.get('/login', loginFunctions.getLogin)
routerLogin.post('/login', 
    passport.authenticate('login'),
    loginFunctions.postLogin
)

routerLogin.get("/register", loginFunctions.getRegister)
// routerLogin.get("/register", function (req, res) {
//     res.sendfile(__dirname + "/register.html");
//   });
routerLogin.post('/register',
    passport.authenticate('register'),
    loginFunctions.postRegister
)

function checkAuthentication(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login')
    }
}

routerLogin.get('/private-route', checkAuthentication, (req, res) => {
    const { user } = req
    res.send("Ruta Okay")
})


// Conectar a la base de datos
const URL = "mongodb://localhost:27017/ecommerce";

function conectarDB(url, cb) {

    mongoose.connect(url)
        .then(()=> console.log('La base de datos de Mongo Local está conectada'))
        .catch((err)=> console.log(err))
}

conectarDB(URL, (err) => {
    if(err) {
        return console.log("Error al conectar la base de datos local");
    }
})


// routerLogin.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../views', 'index.html'));
// })

// Routes Passport Register

// routerLogin.get('/register', (req, res) => {
//     res.sendFile(path.join(__dirname, '../views', 'register.html'));
// })

// routerLogin.post('/register', 
//     passport.authenticate('register'),
//     (req, res) => {
//         var correo = req.correo
//         console.log('Usuario Registrado: ' + correo);

//         res.sendFile(path.join(__dirname, '../views', 'login.html'));
// })

// Routes Passport Login

// routerLogin.get('/login', (req, res) => {
//     if(req.isAuthenticated()) {
//         var correo = req.correo
//         console.log('Usuario Logeado');

//         res.send('login-ok')
//     } else {
//         console.log('Usuario no se ha logeado');
//         res.sendFile(path.join(__dirname, '../views', 'login.html'));
//     }
// })

// routerLogin.post('/login', 
//     passport.authenticate('login', 
//     {
//         successRedirect: '/bienvenido',
//         failureRedirect: '/login',
//         failureFlash: 'Usuario o contraseña incorrecto'
//     }), (req, res) => {
//         var correo = req.correo
//         console.log('Usuario logeado: ' + correo);
//         res.sendFile(path.join(__dirname, '../views', 'profile.html'));
// })

// routerLogin.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../views', 'index.html'));
// })

// Get all users

// routerLogin.get('/', async (req, res) => {
//     let objeto = await loginAuthMongo.getAllUsers()

//     return res.send(objeto)
// })

// Get user by Params ID on Mongo

// routerLogin.get('/:id?', async (req, res) => {
//     let objeto = await loginAuthMongo.getUser(req.params.id)

//     return res.send(objeto)
// })

// Register new user

// routerLogin.get('/register', (req, res) => {
//     res.sendFile(path.join(__dirname, '../views', 'register.html'));
// })

// routerLogin.post('/register', async (req, res) => {
//     let objeto = req.body
//     let result = await loginAuthMongo.save(objeto)
//     console.log("Nuevo usuario agregado");

//     return res.send(result)
// })

// Login User

// routerLogin.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, '../views', 'login.html'));
// })

// Login

// routerLogin.get('/login', (req, res) => {
//     if(req.isAuthenticated()) {
//         var correo = req.correo
//         console.log('Usuario Logeado');

//         res.send('login-ok')
//     } else {
//         console.log('Usuario no se ha logeado');
//         res.sendFile(path.join(__dirname, '../views', 'login.html'));
//     }
// })

// routerLogin.post('/login', async (req, res) => {
//         var correo = req.correo
//         console.log('Usuario logeado: ' + correo);
//         res.sendFile(path.join(__dirname, '../views', 'profile.html'));

// })

//  Register

// routerLogin.get('/register', (req, res) => {
//     res.sendFile(path.join(__dirname, '../views', 'register.html'));
// })

// routerLogin.post('/register', 
//     passport.authenticate('register'),
//     (req, res) => {
//         var correo = req.correo
//         console.log('Usuario Registrado: ' + correo);

//         res.sendFile(path.join(__dirname, '../views', 'login.html'));
// })

//  Destroy Session

// routerLogin.get('/logout', (req, res) => {

    // req.session.destroy(err => {
    //     res.sendFile(path.join(__dirname, '../views', 'index.html'));
    // })
    // req.logout();
    // res.redirect(path.join(__dirname, '../views', 'index.html'));
    // req.session.destroy(function(err){
    //     if(err){
    //        console.log(err);
    //     }else{
    //         res.redirect(path.join(__dirname, '../views', 'index.html'));
    //     }
    //  });
//         req.session.destroy((err) => {
//             if (!err) {
//                 req.user = null
//                 res.redirect("/");
//             } else {
//                 res.redirect("/register")
//             }
//         })
// })


module.exports = routerLogin