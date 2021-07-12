const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uid = require('uuid').v1
const schema = new Schema({
    _id:{type:String, default:uid},
    name: { type: String,unique:true, required: true,message:"Nama Role Telah digunakan" }
});


module.exports = mongoose.model('Role', schema);