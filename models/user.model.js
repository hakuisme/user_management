const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uid = require('uuid').v1

const schema = new Schema({
    _id:{type:String, default:uid},
    fullname: { type: String},
    phone_number: { type: String},
    email: { type: String, unique: [true, 'email harus di-isi'], required: true },
    password:  { type: String },
    roles: [
      {
        type:String,
        ref: "Role"
      }
    ]
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.passwordHash;
    }
});

module.exports = mongoose.model('User', schema);