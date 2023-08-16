const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');
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
        console.logq(req.body);
        const user = await User.login(req.body);
        res.status(200).json({ user: user._id });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
const logout = (req, res) => {
    try {
        res.json({ success: 'User logged out' });
    } catch (error) {
        res.json({ error: 'Failed to logout' });
    }
};
module.exports = { signup_post, login_post, logout };