class Auth {
    static isNotAuthenticated (req, res, next) {
        if (req.isAuthenticated() === true) {
            return res.redirect('/');
        } else {
            next();
        }
    static isAuthenticated (req, res, next) {
        if (req.isAuthenticated() === false) {
            return res.redirect('/login');
        }
    }
}

module.exports = Auth;
