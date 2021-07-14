const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/user.controller')
const authController = require('../../controllers/auth.controller')
/**
 * @swagger
 *  components:
 *    schemas:
 *      Users:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          _id:
 *            type: string         
 *          fullname:
 *            type: string
 *          email:
 *            type: string
 *            description: email harus unique
 *          password:
 *            type: string
 *          roles:
 *            type: array
 *        example:
 *           _id: ffdf-fdsff-ewwwew
 *           fullname: Hanan Kusuma
 *           email: kusuma@hanan.com
 *           roles: ["user","admin"]
 */

/**     
 * @swagger
 * tags:
 *   name: Users
 *   description: User Module
 */
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Create account.
 *     description: User membuat akun baru.
 *     tags: [Users]
 *     requestBody:
 *       required:
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - email
 *               - password
 *               - confirm_password
 *             type: object
 *             properties:
 *               email: 
 *                  type: string
 *               password:
 *                  type: string
 *               confirm_password:
 *                  type: string
 *     responses:
 *       201:
 *         description: Registrasi berhasil
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *              code:
 *                type: integer
 *                default: 201
 *              success:
 *                type: boolean
 *                default: true
 *              message:
 *                type: string
 *                default: Registrasi berhasil
 *       400:
 *         description: Registrasi gagal
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *              code:
 *                type: integer
 *                default: 400
 *              success:
 *                type: boolean
 *                default: true
 *              message:
 *                type: string
 *                default: Registrasi gagal
*/

router.post('/register', authController.signup)

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login to account.
 *     description: User Login.
 *     tags: [Users]
 *     requestBody:
 *       required:
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - email
 *               - password
 *             type: object
 *             properties:
 *               email: 
 *                  type: string
 *               password:
 *                  type: string
 *     responses:
 *       201:
 *         description: Login berhasil
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *              code:
 *                type: integer
 *                default: 201
 *              success:
 *                type: boolean
 *                default: true
 *              token:
 *                type: string
 *              refreshtoken:
 *                type: string
 *              roles:
 *                type: array
 *       400:
 *         description: Login Berhasil
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *              code:
 *                type: integer
 *                default: 400
 *              success:
 *                type: boolean
 *                default: true
 *              message:
 *                type: string
 *                default: login gagal
*/
router.post('/login', authController.signin)


/**
 * @swagger
 * /users/forgot_password:
 *   post:
 *     summary: User forgot password, request to reset password.
 *     description: generate link reset passord
 *     tags: [Users]
 *     requestBody:
 *       required:
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - email
 *             type: object
 *             properties:
 *               email: 
 *                  type: string
 *     responses:
 *       201:
 *         description: kode / token untuk reset password berhasil di generate
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *              code:
 *                type: integer
 *                default: 201
 *              success:
 *                type: boolean
 *                default: true
 *              message:
 *                type: string
 *       400:
 *         description: Request Forgot password gagal
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *              code:
 *                type: integer
 *                default: 400
 *              success:
 *                type: boolean
 *                default: true
 *              message:
 *                type: string
*/

router.post('/forgot_password', authController.forgotPassword)


/**
 * @swagger
 * /users/forgot_password:
 *   post:
 *     summary: Reset password user menggunakan token reset password dan menginputkan password baru
 *     description: User 
 *     tags: [Users]
 *     requestBody:
 *       required:
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - token
 *               - new_password
 *               - new_password_confirm
 *             type: object
 *             properties:
 *               token: 
 *                  type: string
 *               new_password: 
 *                  type: string
 *               new_password_confirm: 
 *                  type: string
 *     responses:
 *       201:
 *         description: Reset password success
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *              code:
 *                type: integer
 *                default: 201
 *              success:
 *                type: boolean
 *                default: true
 *              message:
 *                type: string
 *       400:
 *         description: Reset password gagal
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *              code:
 *                type: integer
 *                default: 400
 *              success:
 *                type: boolean
 *                default: true
 *              message:
 *                type: string
*/
router.post('/reset_password', authController.resetPassword)


/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Get data user.
 *     description: Menampilkan List  user .
 *     tags: [Users]
 *     responses:
 *       201:
 *         description: A list of role's permissions.
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                 type: integer
 *                success:
 *                 type: boolean
 *                data:
 *                 type: array
 *                 $ref: '#/components/schemas/Users'               
*/
router.get('/all', usersController.getAll)

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get single user data.
 *     description: Menampilkan data  user berdasarkan id nya .
 *     tags: [Users]
 *     responses:
 *       201:
 *         description: A single User.
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                 type: integer
 *                success:
 *                 type: boolean
 *                data:
 *                 type: array
 *                 $ref: '#/components/schemas/Users' 
 * 
 *                      
*/
router.get('/:id', usersController.detail)


/**
 * @swagger
 * /users/update:
 *   post:
 *     summary: Update single user data.
 *     description: Mengubah data  user berdasarkan id nya , selain id, minimal ada satu field yang terisi.
 *     tags: [Users]
 *     requestBody:
 *       required:
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - id
 *             type: object
 *             properties:
 *               id: 
 *                  type: string
 *               fullname: 
 *                  type: string
 *               email: 
 *                  type: string
 *               phone_number: 
 *                  type: string
 *     responses:
 *       201:
 *         description: Update single User success.
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                 type: string
 *                success:
 *                 type: boolean
 *                data:
 *                 type: object
 *                 $ref: '#/components/schemas/Users' 
 * 
 *                      
*/
router.post('/update', usersController.update)

/**
 * @swagger
 * /users/password:
 *   post:
 *     summary: Update password user.
 *     description: Mengubah passord berdasarkan id user.
 *     tags: [Users]
 *     requestBody:
 *       required:
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - id
 *               - old_password
 *               - new_password
 *               - new_password_confirm
 *             type: object
 *             properties:
 *               id: 
 *                  type: string
 *               old_password: 
 *                  type: string
 *               new_password: 
 *                  type: string
 *               new_password_confirm: 
 *                  type: string
 *     responses:
 *       201:
 *         description: Password berhasil diubah.
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                 type: string
 *                success:
 *                 type: boolean
 *                message:
 *                 type:string
 * 
 *                      
*/
router.post('/password', usersController.updatePassword)


module.exports = router