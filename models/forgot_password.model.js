const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uid = require('uuid').v1
const schema = new Schema({
    _id:{type:String, default:uid},
    user: { type:String, ref: 'User' },
    code: String,
    created: { type: Date, default: Date.now },
    expires: Date,
    used: Date,
});

module.exports = mongoose.model('ForgotPassword', schema);