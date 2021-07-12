const errHandler = require('../utils/errorHandler')
const db = require('./../models')
const { permission: Permission, role:Roles} = db;

class permissionController{
    async getAll(req,res,next){
        try {
            let permissions = await  Permission.find({}).select('-__v').populate("roles", "-__v").exec()
           
            res.status(201).json({ code: 201, success:true, data: permissions })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async addPermission(req,res,next) {
        let {module_name, methode_name,roles} = req.body

        if(! module_name == '' && ! methode_name) {
            return next(new errHandler(400, false,'Nama Module atau nama methode harus diisi'),req, res, next)
        }

        let permission_roles = []
        if(roles) {
            await Roles.find(
                {
                name: { $in: req.body.roles },
                },(err, roles) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send({ message: err });
                        return;
                    }
            
                    permission_roles = roles.map((role) => role._id);
                }
            );
        }

        try {
            await Permission.create({
                module_name:module_name,
                methode_name:methode_name,
                roles:permission_roles
            })
            res.status(201).json({ code: 201, message: 'User Permission Berhasil dtambahkan' })
        } catch (error) {
            return next(error)
        }
    }

    async updatePermission(req,res,next){
        let {id,module_name, methode_name,roles} = req.body

        if(! module_name == '' && ! methode_name && ! roles) {
            return next(new errHandler(400, false,'Update Permission Gagal '),req, res, next)
        }

        let dataUpdate = {}
        if(module_name && module_name != ''){
            dataUpdate.module_name = module_name
        }
        if(methode_name && methode_name != ''){
            dataUpdate.methode_name = methode_name
        }
        if(roles && roles.length > 0) {
            await Roles.find(
                {
                name: { $in: req.body.roles },
                },(err, roles) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send({ message: err });
                        return;
                    }
            
                    dataUpdate.roles= roles.map((role) => role._id);
                }
            );
        }
        try {
            let updated = await Permission.findOneAndUpdate({_id:id}, dataUpdate)
            if(updated   != null )
                res.status(201).json({ code: 201, message: 'User Permission Berhasil diupdate' })
            else
            res.status(400).json({ code: 400, message: 'Data Permission tidak  ditemukan' })
        } catch (error) {
            return next(error)
        }
    }


    async deletePermission(req,res,next){
        let {id} = req.body

        
        try {
            let updated = await Permission.findOneAndDelete({_id:id})
            if(updated   != null )
                res.status(201).json({ code: 201, message: 'User Permission Berhasil dihapus' })
            else
            res.status(400).json({ code: 400, message: 'Data Permission tidak  ditemukan' })
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new permissionController()