const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');
const { createToken } = require('../services/auth.js');
const jwt = require('jsonwebtoken');
const user_info = async (req, res) => {
    try {
        // console.log("Hi", req.params.id);
        const response = await User.findById(req.params.id).select('-password');
        res.json(response);
    }
    catch (error) {
        // console.log(error)
    }
}

const update_user = asyncHandler(async (req, res) => {
    try {
        // console.log(req.body, req.params.id);
        const _id = req.params.id;
        const data = req.body;
        const response = await User.findOneAndUpdate({ _id: _id }, data, { new: true });
        res.status(200).json({ user: response._id });
    }
    catch (error) {
        // console.log(error)
    }
})
module.exports = { user_info, update_user };