const mongoose = require('mongoose');
const validatator = require('validator');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    pic: {
        type: String,
        default: ''
    },
    firstname: {
        type: String,
        required: [true, 'Please Enter Your First Name'],
    },
    lastname: {
        type: String,
        required: [true, 'Please Enter Your Last Name'],
    },
    email: {
        type: String,
        required: [true, 'Please Enter Your Email'],
        unique: true,
        lowercase: true,
        validate: [validatator.isEmail, 'Please Enter A Valid Email']
    },
    phone: {
        type: Number,
        required: [true, 'Please Enter Your Phone Number'],
        minlength: [10, 'Please Enter A Valid Phone Number'],
    },
    password: {
        type: String,
        required: [true, 'Please Enter Password'],
        minlength: [8, 'Minimum password length is 8 characters'],
    },
    experience: {
        type: Array,
        default: []
    },
    certification: {
        type: Array,
        default: []
    },
    education: {
        type: Array,
        default: []
    },
    skills: {
        type: Array,
        default: []
    },
    about: {
        type: String,
        default: ''
    },
    connections: {
        type: Array,
        default: []
    }
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (userData) {
    const user = await this.findOne({ email: userData.email });
    if (user) {
        const auth = await bcrypt.compare(userData.password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect Password');
    }
    throw Error('Incorrect Email');
};
const User = mongoose.model('User', userSchema);

module.exports = User;