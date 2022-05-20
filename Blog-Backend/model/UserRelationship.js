const mongoose = require('mongoose')
const User = require("./User");
const UserRelationshipSchema = new mongoose.Schema({
    Relating_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    Related_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }, 
    status: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('UserRelationship', UserRelationshipSchema);