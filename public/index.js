const socket = io.connect()

let productos = [];

//Pregunta el nombre, y lo guarda en la session
// let username = sessionStorage.getItem("username");
// if(!username) {
//     username = prompt("Ingresa mombre de usuario: ");
// }

// $("#username").html(username)
//Pregunta el nombre, y lo guarda en la session

fetch('/api/productos')
    .then( response => response.json())
    .then( (data) => {
        productos = data
        console.log(productos)
        render()
    })  

function render(){
    $("#productos").html("")
    for(let item of productos){
        $("#productos").prepend(`
            <tr class="text-center">
                <td><strong>${item.id}</strong></td>
                <td><img src=${item.thumbnail} style="width: 50px; height: auto;"></img></td>
                <td>${item.producto}</td>
                <td>$${item.price}</td>
                <td>${item.timestamp}</td>
                <td>${item.descripcion}</td>
                <td>${item.codigo}</td>
                <td>${item.stock}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <a class="btn btn-warning btn-sm" href="#" role="button">Editar</a>
                        <a class="btn btn-danger btn-sm" href="#" role="button">Eliminar</a>
                    </div>
                </td>

                
            </tr>
        `)
    }
}

socket.on('productos', (data) => {
    console.log(data);
    productos.push(data);
    render();
})

$('#formProductos').submit((e) => {
    e.preventDefault();

    data = {
        author: username,
        producto: $("#producto").val(),
        price: $("#price").val(),
        thumbnail: $("#thumbnail").val()
    }

    socket.emit('new_producto', data)
    return false
});