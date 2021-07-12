const express = require('express')
const router = express.Router()
const permissionController = require('../../controllers/permission.controller')


router.get('/all', permissionController.getAll)
router.post('/add', permissionController.addPermission)
router.post('/update', permissionController.updatePermission)
router.post('/delete', permissionController.deletePermission)



module.exports = router