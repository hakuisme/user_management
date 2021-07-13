const express = require('express')
const router = express.Router()
const roleController = require('../../controllers/role.controller')

/**
 * @swagger
 *  components:
 *    schemas:
 *      Roles:
 *        type: object
 *        required:
 *          - name
 *        properties:
 *          _id:
 *            type: string         
 *          name:
 *            type: string
 *            description: Roles Name, harus unique
 *        example:
 *           _id: ffdf-fdsff-ewwwew
 *           name: user
 */

/**
 * @swagger
 * tags:
 *   name: Permission
 *   description: Permission Module
 */
/**
 * @swagger
 * /roles/all:
 *   get:
 *     summary: List Roles.
 *     description: Menampilkan List Role user.
 *     tags: [Roles]
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
 *                 $ref: '#/components/schemas/Permission'               
*/
router.get('/all', roleController.listRole)

/**
 * @swagger
 * /roles/add:
 *   post:
 *     summary: Add New Role.
 *     description: Menambahkan Data Role.
 *     tags: [Roles]
 *     requestBody:
 *       required:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Roles'
 *     responses:
 *       201:
 *         description: Berhasil Menambahkan Data Role.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *              code:
 *                type: integer
 *                default: 200
 *              success:
 *                type: boolean
 *                default: true
 *              message:
 *                type: string
 *                default: data berhasil ditambahkan  
 *       400:
 *         description: Gagal Menambahkan Data Role.
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
 *                default: false
 *              message:
 *                type: string
 *                default: data gagal ditambahkan  
 *                    
*/
router.post('/add', roleController.addRole)


/**
 * @swagger
 * /roles/update:
 *   post:
 *     summary: Update roles.
 *     description: Mengubah Data Pemission user, salah satu field wajib di-isi.
 *     tags: [Roles]
 *     requestBody:
 *       required:
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *               id: 
 *                 type: string
 *               name: 
 *                 type: string
 *     responses:
 *       201:
 *         description: Berhasil Mengubah Data Role.
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
 *                default: data berhasil diubah  
 *       400:
 *         description: Gagal Mengubah Data Role.
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
 *                default: false
 *              message:
 *                type: string
 *                default: data gagal diubah  
 *                    
*/
router.post('/edit', roleController.editRole)


/**
 * @swagger
 * /roles/delete:
 *   post:
 *     summary: Delete Role.
 *     description: Menghapus Data Role user,.
 *     tags: [Roles]
 *     requestBody:
 *       required:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: 
 *                  type: string
 *     responses:
 *       201:
 *         description: Berhasil Menghapus Data Role.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *              code:
 *                type: integer
 *                default: 200
 *              success:
 *                type: boolean
 *                default: true
 *              message:
 *                type: string
 *                default: data berhasil dihapus  
 *       400:
 *         description: Gagal Menghapus Data Role.
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
 *                default: false
 *              message:
 *                type: string
 *                default: data gagal dihapus  
 *                    
*/
router.post('/delete', roleController.deleteRole)



module.exports = router