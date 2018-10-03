const mongoose = require('mongoose');

const article = new mongoose.Schema({
    title : String,
    content : String,
    creationdate : {
        type : Date,
        default : Date.now()
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true
    },
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'comment'
    }]
});

module.exports = article;