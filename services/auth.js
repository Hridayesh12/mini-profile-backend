const jwt = require("jsonwebtoken");
const createToken = (id) => {
    return jwt.sign({ id }, `${process.env.SECRET_KEY}`, {
        expiresIn: process.env.TOKEN_VALIDITY,
    });
};

module.exports = { createToken };