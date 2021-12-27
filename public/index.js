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
            <tr>
                <td><strong>${item.producto}</strong></td>
                <td><strong>${item.price}</strong></td>
                <td><img src=${item.thumbnail} style="width: 50px; height: auto;"></img></td>
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