const express = require('express')
const router = express.Router()
const roleController = require('../../controllers/role.controller')


router.get('/all', roleController.listRole)
router.post('/add', roleController.addRole)
router.post('/edit', roleController.editRole)
router.post('/delete', roleController.deleteRole)



module.exports = router