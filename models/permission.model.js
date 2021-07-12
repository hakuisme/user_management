const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uid = require('uuid').v1

const schema = new Schema({
    _id:{type:String, default:uid},
    module_name:{type:String,required:true},
    methode_name: {type:String,required:true},
    roles: [
        {
          type:String,
          ref: "Role"
        }
      ]
    
});

module.exports = mongoose.model('Permission', schema);