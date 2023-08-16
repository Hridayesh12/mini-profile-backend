const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');
const { createToken } = require('../services/auth.js');
const jwt = require('jsonwebtoken');
const user_data = async (req, res) => {
    try {
        console.log(req.cookies);
        let auth_token = req.cookies.jwt.jwt;
        const token = auth_token;
        const response = jwt.verify(token, process.env.SECRET_KEY);
        res.json(response);
    }
    catch (error) {
        console.log(error)
    }
}
const signup_post = asyncHandler(async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.create(req.body);
        res.status(200).json({ user: user._id });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
const login_post = asyncHandler(async (req, res) => {
    try {
        const user = await User.login(req.body);
        console.log(user._id);
        const token = createToken(user._id);
        console.log(token);
        res.cookie('jwt', { jwt: token, httpOnly: true, maxAge: process.env.TOKEN_VALIDITY });
        res.status(200).json({ user: user._id });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
const logout = (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 1 });
        res.json({ success: 'User logged out' });
    } catch (error) {
        res.json({ error: 'Failed to logout' });
    }
};
module.exports = { user_data, signup_post, login_post, logout };