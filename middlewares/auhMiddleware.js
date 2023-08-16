const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const authUser = (req, res, next) => {
    let token;
    // console.log();
    if (req.cookies.jwt.jwt) {
        try {
            token = req.cookies.jwt.jwt;
            // console.log(token);
            const decoded = jwt.verify(token, `${process.env.SECRET_KEY}`);
            req.user = User.findById(decoded.id).select('-password');
            next();
        }
        catch (err) {
            res.status(400).json({ 'Message': `${err.message}` });
        }
    }
    if (!token) {
        res.status(400).json({ 'Message': 'Login First' });
    }
}

module.exports = authUser;