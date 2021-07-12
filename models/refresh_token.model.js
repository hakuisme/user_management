const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uid = require('uuid').v1

const schema = new Schema({
    _id:{type:String, default:uid},
    user: { type:String, ref: 'User' },
    token: String,
    expires: Date,
    
});

module.exports = mongoose.model('RefreshToken', schema);