const mongoose = require('mongoose');

const comment = new mongoose.Schema({
    content : String,
    creationdate : {
        type: Date,
        default: Date.now()
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true
    }
});

module.exports = comment ;