const routerProducts = require('../../routers/product_router');
const StoreRepo = require('../../repository/store')
const config = require('../../config.js')

class ProductosDaoArchivo extends StoreRepo {
    constructor() {
        super('db/data.json')
        super.connect()
    }
    async getAll() {
        return super.getAll()
    }
    async save(obj) {
        return super.save(obj)
    }
    async getProduct(obj) {
        return super.getProduct(obj)
    }
    async updateProduct(id, obj) {
        return super.updateProduct(id, obj)
    }
    async deleteProduct(id) {
        return super.deleteProduct(id)
    }
}

// class ProductosDaoArchivo extends StoreRepo {
//     constructor() {
//         this.almacen = []
//         this.counter_id = 0
//         this.url = `${config.FileSystem.filepath}`
//         super(
//             this.almacen,
//             this.almacen,
//             this.counter_id,
//             this.url
//         )
//         super.connect()
//     }
//     async getAll() {
//         return super.getAll()
//     }
//     async save(obj) {
//         return super.save(obj)
//     }
// }

module.exports = ProductosDaoArchivo