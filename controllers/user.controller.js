const errHandler = require('../utils/errorHandler')
const db = require('./../models')
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

        let {id, fullname,email} = req.body

        let objUpdate = {}
        if(fullname != '') {
            objUpdate.fullname = fullname
        }
        let updated = false;
        if(email != '') {
            objUpdate.email = email
        }
        
        if(Object.keys(objUpdate).length > 0) {
            updated = await User.findOneAndUpdate({id:id}, objUpdate)
        }
        res.status(201).json({ code: 201, data:user})
    }

    async updatePassword(req,res,next){
        let {id, old_passsword,new_password} = req.body

        let user = await User.findById({id:id})
        if(user == null) {
            return next(new errHandler(400, false,'Data User tidak ditemukan'),req, res, next)
        }
        if(!await common.verifyPassword(old_passsword, user.password)) {
            res.status(200).json({code : 401,
            msg : 'Email atau Password tidak sesuai!!'}
            )
            return next(new errHandler(400, false,'Password Lama tidak sesuai'),req, res, next)
        } 

        const passwordHash = await common.generateBcrypt(password)
        let updated = await User.findOneAndUpdate({id:id},{password:passwordHash})
    }
}

module.exports = new userController()