const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/user.controller')


router.get('/all', usersController.getAll)
router.get('/:id', usersController.detail)
// router.post('/add', usersController.addRole)
// router.post('/edit', usersController.editRole)
// router.post('/delete', usersController.deleteRole)



module.exports = router