const mongoose = require('mongoose')
const User = require("./User");
const blogSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String,
        require: true,
        min: 1
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Blog', blogSchema);