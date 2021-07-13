const express = require('express')
const router = express.Router()

// const auth = require('./auth')
const roles = require('./roles')
const users = require('./users')
const permission = require('./permission')



// router.use('/auth',auth)
router.use('/roles',roles)
router.use('/users',users)
router.use('/permission',permission)



module.exports = router