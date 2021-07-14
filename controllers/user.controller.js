const errHandler = require('../utils/errorHandler')
const db = require('./../models')
const common =require('../utils/common')
const { user: User} = db;

class userController {
    async getAll(req,res,next) {
        const user =await  User.find({}).select("-password").populate("roles", "-__v").exec()
        res.status(201).json({ code: 201, data:user})
    }
    async detail(req,res,next) {
        let id = req.params.id
        const user =await  User.findById(id).select("-password").populate("roles", "-__v").exec()
        if(user != null) {
           
            let authorities = [];
            if(user.roles != null) {
                
                for (let i = 0; i < user.roles.length; i++) {
                    authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
                }
                
            }
            res.status(201).json({ code: 201, data:user})
        } else {
            return next(new errHandler(400, false,'Password Lama tidak sesuai'),req, res, next)
        }
        
    }

    async update(req,res,next) {

        let {id, fullname,email,phone_number} = req.body
        let user = await User.findById(id)
        if(user == null) {
            return next(new errHandler(400, false,'Data User tidak ditemukan'),req, res, next)
        }
        let objUpdate = {}
        if(fullname != '') {
            objUpdate.fullname = fullname
        }
        let updated = false;
        if(email != '') {
            objUpdate.email = email
        }
        if(phone_number != '') {
            objUpdate.phone_number = phone_number
        }
        
        if(Object.keys(objUpdate).length > 0) {
            updated = await User.findOneAndUpdate(id, objUpdate)
        }
        res.status(201).json({ code: 201,success:true, message:"Profil user berhasil di-update",data:user})
    }

    async updatePassword(req,res,next){
        let {id, old_password,new_password, new_password_confirm} = req.body

        let user = await User.findById(id)
        if(user == null) {
            return next(new errHandler(400, false,'Data User tidak ditemukan'),req, res, next)
        }
        if(!old_password || old_password == '') {
            return next(new errHandler(400, false,'Password Lama harus diisi'),req, res, next)
        }


        if(!await common.verifyPassword(old_password, user.password)) {
           
            return next(new errHandler(400, false,'Password Lama tidak sesuai'),req, res, next)
        } 

        if((!new_password || new_password == '') || (!new_password_confirm || new_password_confirm == '')) {
            return next(new errHandler(400, false,'Password Baru / Konfirmasi password baru harus di-isi'),req, res, next)
        }
        if( new_password  !== new_password_confirm) {
            return next(new errHandler(400, false,'Password Baru / Konfirmasi password baru tidak sesuai'),req, res, next)
        }
        const passwordHash = await common.generateBcrypt(new_password)
        let updated = await User.findByIdAndUpdate(id,{password:passwordHash})
        res.status(201).json({ code: 201,success:true, message:"Password user berhasil diubah"})
    }
}

module.exports = new userController()