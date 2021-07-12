const errHandler = require('../utils/errorHandler')
const validator = require('validator')
const common =require('../utils/common')
const User = require('../models/user.model')
const Roles = require("../models/role.model")
const fPassword = require("../models/forgot_password.model")

class authController {
    //Register
    async signup(req,res,next) {
        let code = 304
        let success = false
        let msg = 'gagal menyimpan data'
        let {fullname, email, password, confirm_password,phone_number} = req.body
        if(email =='' || email == undefined) {
            return next(new errHandler(400, false,'email harus di-isi'),req, res, next)
        } else {
            if(! validator.isEmail(email)) {
                return next(new errHandler(400, false,'format email tidak valid'),req, res, next)
            }
        }

        if (password !== req.body.confirm_password) {
            return next(new AppError(404, false, 'Password tidak sama'), req, res, next)
        }

        try {
            let isExisted =await User.find({email:email}).countDocuments()

            let check = await User.find({email:email})

            if(isExisted > 0) {
                code = 409
                msg = 'Email sudah terdaftar'
            }
             else {
                 //CheckRoles
                const passwordHash = await common.generateBcrypt(password)
                let userData = {
                    fullname:fullname,
                    password:passwordHash,
                    email:email,
                    phone_number:phone_number
                }
                
                 if (req.body.roles) {
                    await Roles.find(
                        {
                        name: { $in: req.body.roles },
                        },
                        (err, roles) => {
                        if (err) {
                            console.log(err)
                            res.status(500).send({ message: err });
                            return;
                        }
                
                        userData.roles = roles.map((role) => role._id);
                        }
                    );
                } else {
                    await Roles.findOne({ name: "user" }, (err, role) => {
                        if (err) {
                        console.log(err)
                        res.status(500).send({ message: err });
                        return;
                        }
                        userData.roles = [role._id];
                    
                    });
                }
                const user = await User.create(userData)
                
                if (user !== null) {
                    code = 201
                    success = true
                    msg = 'Registrasi berhasil'
                }
            }
            res.status(201).json({ code: code, success:success, message: msg })
        } catch (err) {

            next(err)
        }
    }

    async signin(req,res, next){
        let user_ip

        if(req.headers['cf-connecting-ip'] && req.headers['cf-connecting-ip'].split(', ').length) {
            let first = req.headers['cf-connecting-ip'].split(', ');
            user_ip = first[0];
        } else {
            user_ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
        }

        let code = 304
        let msg = 'Terjadi kesalahan'
        let dataToken = ''

        try {           
            const {
              email,
              password
            } = req.body
            if (!email || !password) {
                res.status(200).json({
                    code : 203,
                    msg : 'Email Atau Password tidak boleh kosong'})
            } else {
              let dataUser = await User.findOne({email:email}).populate("roles", "-__v")
              if(dataUser == null) {
                res.status(200).json({
                code : 204,
                msg : 'Akun belum terdaftar !'})
              } else {
                if(!await common.verifyPassword(password, dataUser.password)) {
                    res.status(200).json({code : 401,
                    msg : 'Email atau Password tidak sesuai!!'}
                    )
                } else {
                    let token = await common.createToken({id:dataUser.id})
        
                    let refreshToken = await common.createRefreshToken(dataUser);
                    let authorities = [];
        
                    for (let i = 0; i < dataUser.roles.length; i++) {
                        authorities.push("ROLE_" + dataUser.roles[i].name.toUpperCase());
                    }
                    res.status(200).json({
                      code: 200,
                      token: token,
                      refreshtoken:refreshToken,
                      roles:authorities
                    })     
                }   
                 
              }
            }

            
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async forgotPassword(req, res, next) {
        
        const crypto = require('crypto')
        let {email} = req.body
       
        if(!email || email == '') {
            return next(new errHandler(400, false,'email harus di-isi'),req, res, next)
        }
        let user = await User.findOne({email:email})
       
        if(user == null) {
            return next(new errHandler(400, false,'data user tidak ditemukan'),req, res, next)
        }
        let code = crypto.randomBytes(40).toString("hex");
        let createdAt = new Date()
        let expiredAt = createdAt.getTime() + (12 * 60 * 60 * 1000)
        let genForgotPassword = await fPassword.create({
            code:code,
            user:user.id,
            created:createdAt,
            expires:expiredAt
        })
        if(genForgotPassword != null)
            res.status(201).json({ code: 201, success:true, message: 'Link reset password akan dikirimkan ke email Anda' })
        else 
            return next(new errHandler(400, false,'Link Reset gagal dibuaat, silahkan coba beberapa saat lagi'),req, res, next)
       
    }
    async resetPassword(req,res,next) {
        const {token,new_password, new_password_confirm} = req.body

        if(!token || token == ''){
            return next(new errHandler(400, false,'token reset password tidak ditemukan'),req, res, next)
        }

        let check = await fPassword.findOne({code:token})
        if(check == null) {
            return next(new errHandler(400, false,'token reset password tidak ditemukan'),req, res, next)
        }
        if(check.expires.getTime() < new Date().getTime()) {
            return next(new errHandler(400, false,'link reset password sudah tidak aktif'),req, res, next)
        }
        if((! new_password || new_password == '') || (!new_password_confirm || new_password_confirm == '')){
            return next(new errHandler(400, false,'Password Baru dan Konfirmasi Password baru harus di-isi',req, res, next))
        }

        if(new_password !== new_password_confirm  ){
            return next(new errHandler(400, false,'Password Baru dan Konfirmasi Password tidak sesuai',req, res, next))
        }
        const passwordHash = await common.generateBcrypt(new_password)
        let update = await User.findByIdAndUpdate(check.user,{password:passwordHash})
        if(update != null){
            res.status(201).json({ code: 201, success:true, message: 'Password berhasil direset, silahkan login' })
        }
        else {
            return next(new errHandler(400, false,'Reset Password Gagal',req, res, next))
        }
    }

}

module.exports = new authController()