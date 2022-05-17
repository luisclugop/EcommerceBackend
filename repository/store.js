const fs = require('fs')

class StoreRepo {
    
    // constructor() {
    //     this.almacen = []
    //     this.counter_id = 0
    // }

    // addProduct(product) {
    //     this.counter_id++

    //     product.id = this.counter_id
    //     product.timestamp = Date.now()
        
    //     this.almacen.push(product)

    //     return true
    // }

    // updateProduct(id, objeto) {
    //     const index = this.almacen.findIndex( (objetoActualizar) => objetoActualizar.id == id)
    //     if (index != -1) {
    //         objeto.id = this.almacen[index].id
    //         this.almacen[index] = objeto

    //         return objeto;
    //     } else {
    //         return false;
    //     }
    // }


    // deleteProduct(id) {
    //     this.almacen = this.almacen.filter( p => p.id != id )
    //     return true
    // }

    // getProduct(id) {
    //     return (id) ? this.almacen.find(p => p.id == id) : this.almacen
    // }

    constructor(url) {
        // this.almacen = []
        // this.counter_id = 0
        this.url = url
    }

    // Conexion al archivo File
    
    async connect() {
        return true
    }

    async getProduct(id) {
        try {
            const objs = await this.getAll()

            return objs.find(o => o.id == id)
        } catch (error) {
            console.log(error);
            return []
        }
    }

    async getAll() {
        try {
            return JSON.parse(fs.readFileSync(this.url, 'utf-8'))
        } catch (error) {
            console.log(error);
            return []
        }
    }

    async save(obj) {
        const objs = await this.getAll()
        let newId = (objs.length == 0) ? 1 : objs[objs.length - 1].id + 1

        const newObj = { ...obj, id: newId }
        objs.push(newObj)

        try {
            const result = fs.writeFileSync(this.url, JSON.stringify(objs))
            
            return result
        } catch(error) {
            throw new Error(`Error guardando: ${error}`)
        }
    }

    async updateProduct(id, objeto) {
        const objs = await this.getAll()
        const index = objs.findIndex( o => o.id == id )

        try {
            if (index != -1) {
                //Log object to Console.
                // console.log("Before update: ", objs[index])
    
                //Update object's property.
                objs[index] = { ...objeto, id: parseInt(id) }
    
                //Log object to console again.
                // console.log("After update: ", objs[index])
    
                // console.log(objs);
                const result = fs.writeFileSync(this.url, JSON.stringify(objs))
                console.log("Producto Actualizado correctamente");
                return result
            } else {
                console.log("Index Incorrecto");
                return false
            }            
        } catch(error) {
            throw new Error(`Error guardando: ${error}`)
        }
    }

    // deleteProduct(id) {
    //     this.almacen = this.almacen.filter( p => p.id != id )
    //     return true
    // }

    async deleteProduct(id) {
        // console.log(id);

        const objs = await this.getAll()        
        
        try {
            //Log object to Console.
            console.log("Before delete: ", objs);

            //Delete Product
            objs.splice(objs.indexOf(id), 1)

            //Log object to Console.
            console.log("After delete: ", objs);

            const result = fs.writeFileSync(this.url, JSON.stringify(objs))
            console.log("Producto Eliminado correctamente");
            return result
        } catch(error) {
            throw new Error(`Error eliminando: ${error}`)
        }
    }

}

module.exports = StoreRepo