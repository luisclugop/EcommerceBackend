const fs = require('fs');
const error = { error: 'producto no encontrado' };

class Contenedor {
    constructor(filename = "productos.json") {
        this.id = 0;
        this.list = [];
        this.filename = filename;

        this.init();
    }

    init() {
        console.log(`Loading ${this.filename} ...`)
        const data = fs.readFileSync(this.filename)
        const listaFromFile = JSON.parse(data)

        for(const objeto of listaFromFile) {
            this.insert(objeto);
        }
        console.log(`File loaded.`)
    }

    find(id) {
        // return this.list.find( (objeto) => objeto.id == id)
        const producto = this.list.find( (objeto) => objeto.id == id)
        if(producto) {
            return producto;
        } else {
            return error;
        }

        // condicional ternaria
        // return producto ? producto : error
    }

    insert(objeto) {
        objeto.id = ++this.id;
        this.list.push(objeto);
        return objeto
    }

    update(id, objeto) {
        const index = this.list.findIndex( (objetoActualizar) => objetoActualizar.id == id)
        // objeto.id = this.list[index].id
        // this.list[index] = objeto

        // return objeto;

        if (index != -1) {
            objeto.id = this.list[index].id
            this.list[index] = objeto

            return objeto;
        } else {
            return error;
        }
    }

    delete(id) {
        const indexDelete = this.list.findIndex( (objetoEliminar) => objetoEliminar.id == id)
        // this.list.splice(indexDelete, 1);

        // return this.list;

        if (indexDelete != -1) {
            this.list.splice(indexDelete, 1);

            return this.list;
        } else {
            return error;
        }
    }
}

module.exports = Contenedor;