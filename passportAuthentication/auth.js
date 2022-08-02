class Auth {
    static isNotAuthenticated (req, res, next) {
        if (req.isAuthenticated() === true) {
            return res.redirect('/');
        }
        next();
    }
    static isAuthenticated (req, res, next) {
        if (req.isAuthenticated() === false) {
            return res.redirect('/login');
        }
        next();
    }
}

module.exports = Auth;