const errHandler = require('../utils/errorHandler')
const Roles = require("../models/role.model")


class roleController{
    async listRole(req,res,next) {
        try {
            let roles = await Roles.find({})
            let arrRoles = []
            arrRoles = roles.map((role) => role.name)
            res.status(201).json({ code: 201, success:true, data: arrRoles })
        } catch (err) {
            console.log(err)
            next(err)
        }
      
    } 

    async addRole(req,res,next) {
        let name = req.body.name || ''
        if(name == '') {
            return next(new errHandler(400, false,'Nama Role harus diisi'),req, res, next)
        }
        try {
            let check = await Roles.find({name:name}).countDocuments()
            if(check > 0) {
                return next(new errHandler(400, false,'Nama Role telah terdaftar'),req, res, next)
                // res.status(400).json({ code: 400, success:false, message: 'Nama Role telah terdaftar' })
            }
            const role = await Roles.create({name:name})
            if(role != null )
            {
                res.status(201).json({ code: 201, message: 'Role berhasil ditambahkan' })
            } 
        } catch (error) {
            next(error)
        }
    }

    async editRole(req,res,next) {
        let oldname = req.body.oldname || ''
        let name = req.body.name || ''

        if(oldname == '') {
            return next(new errHandler(400, false,'Nama Role Lama harus diisi'),req, res, next)
        } else {
            let check = await Roles.find({name:oldname}).countDocument()
            if(check <= 0) {
                return next(new errHandler(400, false,'Nama Role Lama tidak terdaftar'),req, res, next)
            }
        }
        if(name == '') {
            return next(new errHandler(400, false,'Nama Role harus diisi'),req, res, next)
        }
        try {
            let check = await Roles.find({name:name}).countDocuments()
            if(check > 0) {
                return next(new errHandler(400, false,'Nama Role Baru telah terdaftar'),req, res, next)
            }
            const role = await Roles.findOneAndUpdate({name:oldname},{name:name})
            if(role != null )
            {
                res.status(201).json({ code: 201, message: 'Role berhasil diubah' })
            } 
        } catch (error) {
            next(error)
        }
    }

    async deleteRole(req,res,next){
        let name = req.body.name || ''
        let deleted = await Roles.findOneAndDelete({name:name})
        if(deleted == null) {
            return next(new errHandler(400, false,'Tidak ada Data yang dihapus'),req, res, next)
        }
        res.status(201).json({ code: 201, message: 'Role berhasil dihapus' })

    }
}
module.exports = new roleController()