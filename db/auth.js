module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Necesitas iniciar sesion de nuevo')
        res.redirect('/users/login')
    }
}