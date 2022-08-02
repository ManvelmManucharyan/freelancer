const jwt = require('jsonwebtoken');

class Token {
    static async createToken (user) {
        const token = jwt.sign( {user: user._id}, process.env.JWT_SECRET, {expiresIn: '6h'} );
        user.token = token;
        await user.save();
    }
}

module.exports = Token;