const path = require('path');

function getRoot(req, res) {
    res.sendFile(path.join(__dirname, './views', 'index.html'));
    // res.sendFile(__dirname, '../views', 'index.html');
    // res.send("Hola index")
}

function getLogin(req, res) {
    if(req.isAuthenticated()) {
        var correo = req.correo
        console.log('Usuario Logeado');

        res.send('login-ok')
    } else {
        console.log('Usuario no se ha logeado');
        // res.sendFile(__dirname, './views', 'login.html');
        res.sendFile(path.join(__dirname, './views', 'login.html'));
    }
}

function postLogin(req, res) {
    let user = req.user
    console.log('Usuario logeado: ' + correo);
    res.sendFile(path.join(__dirname, './views', 'profile.html'));
}

function getRegister(req, res) {
    res.sendFile(path.join(__dirname, './views', 'register.html'));
}

function postRegister(req, res) {
    // let user = req.user
    // console.log('Usuario logeado: ' + correo);
    res.sendFile(path.join(__dirname, './views', 'login.html'));
}

module.exports = { 
    getRoot,
    getLogin,
    postLogin,
    getRegister,
    postRegister
}