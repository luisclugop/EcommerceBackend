const ProductosDaoArchivo = require('./productos/ProductosDaoArchivo')
const ProductosDaoMongo = require('./productos/ProductosDaoMongo')

let productosDao;
let carritosDao;

switch(process.env.DATABASE) {
    case 'file':
        productosDao = new ProductosDaoArchivo()
        break

    case 'mongo':
        productosDao = new ProductosDaoMongo()
        break

    default:
        break
}

module.exports = { productosDao, carritosDao }