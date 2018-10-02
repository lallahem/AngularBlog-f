const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: String,
    lastname: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    // access control
    access: { type: Boolean, default: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }

});

module.exports = user;