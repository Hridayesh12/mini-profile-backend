const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');
const { createToken } = require('../services/auth.js');
const jwt = require('jsonwebtoken');

const get_connections = async (req, res) => {
    try {
        const userIds = req.body;
        // console.log("Yo", req.body);
        if (userIds != {}) {
            const users = await User.find({ _id: { $in: userIds } }).select('-password');
            // console.log(users);
            res.status(200).json(users);
        }
    } catch (error) {
        throw new Error('Error finding users: ' + error.message);
    }
}

const findUsersNotConnected = async (req, res) => {
    try {
        // console.log(req.body);
        const userIds = req.body;
        const users = await User.find({ _id: { $nin: userIds } }).select('-password');
        // console.log(users);
        res.status(200).json(users);
    } catch (error) {
        throw new Error('Error finding users: ' + error.message);
    }
}


module.exports = {
    get_connections,
    findUsersNotConnected
}