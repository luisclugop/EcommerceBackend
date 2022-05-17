// Dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

// Database
const database = require('./db/db')

// Routes
const routerIndex = require('./routers/product_router')
const routerProducts = require('./routers/product_router')
const routerCart = require('./routers/cart_router')
// const routerLogin = require('./routers/login_router')

// Routes Mongo
const routerProductsMongo = require('./routers/product_router_mongo')

// App - PORT

const app = express()
const PORT = process.env.port || 8080;

// ENGINE Motor Templates

// app.engine('hbs', exphbs.engine({
//     extname: '.hbs',
//     layoutsDir: path.join("views", "layouts"),
//     defaultLayout: 'main.hbs'
// }))

// app.set('view engine', 'hbs')

// 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static('views'));

//
app.use('/', routerIndex)
// app.use('/api/product', routerProducts)
// app.use('/api/cart', routerCart)
// app.use('/', routerLogin)

// Mongo
// app.use('/api/productMongo', routerProductsMongo)

// Index

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './views', 'index.html'));
// })

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

database()