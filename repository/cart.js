class CartRepo {
    constructor(id) {
        this.id = id
        this.timestamp = Date.now()
        this.products = []
        // this.counter_id = 0
    }

    addProduct(product) {
        this.counter_id++

        product.id = this.counter_id
        product.timestamp = Date.now()
        
        this.almacen.push(product)

        return true
    }
}

class BussinessRepo {
    constructor() {
        this.carts = []
        this.counter_id = 0
    }

    createCart() {
        this.counter_id++
        const cart = new CartRepo(this.counter_id)

        this.carts.push(cart)

        return cart
    }

    getProducts(id) {
        let cart = this.carts.find(c => c.id == id)

        return cart.products
    }

    insertProduct(idCart, product) {
        let cart = this.carts.find(c => c.id == idCart)

        cart.products.push(product)

        return cart.products
    }

    deleteCart(id) {
        this.carts = this.carts.filter( p => p.id != id )
        return true
    }

    deleteProductCart(idCart, idProd) {
        let cart = this.carts.find(c => c.id == idCart)

        if(!cart) return false

        let indexProduct = cart.products.findIndex(p => p.id == idProd);
        
        if (indexProduct != -1) return false
        
        cart.products.splice(indexProduct, 1);

        return true        
    }
}

module.exports = { CartRepo, BussinessRepo }