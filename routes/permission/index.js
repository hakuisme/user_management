const express = require('express')
const router = express.Router()
const permissionController = require('../../controllers/permission.controller')
/**
 * @swagger
 *  components:
 *    schemas:
 *      Permission:
 *        type: object
 *        required:
 *          - module_name
 *          - methode_name
 *        properties:
 *          _id:
 *            type: string         
 *          module_name:
 *            type: string
 *          methode_name:
 *            type: string
 *          roles:
 *            type: array
 *        example:
 *           _id: ffdf-fdsff-ewwwew
 *           module_name: Alexander
 *           methode_name: fake@email.com
 *           roles: ["user","admin"]
 */

/**
 * @swagger
 * tags:
 *   name: Permission
 *   description: Permission Module
 */
/**
 * @swagger
 * /permission/all:
 *   get:
 *     summary: User Permission.
 *     description: Menampilkan List Permission user berdasarkan roles nya.
 *     tags: [Permission]
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

router.get('/all', permissionController.getAll)

/**
 * @swagger
 * /permission/add:
 *   post:
 *     summary: Add New Permission.
 *     description: Menambahkan Data Pemission user berdasarkan roles nya.
 *     tags: [Permission]
 *     requestBody:
 *       required:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Permission'
 *     responses:
 *       201:
 *         description: Berhasil Menambahkan Data Pemission user berdasarkan roles nya.
 *         content:
 *           application/json:
 *            schema:
 *       400:
 *         description: Gagal Menambahkan Data Pemission user berdasarkan roles nya.
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
router.post('/add', permissionController.addPermission)

/**
 * @swagger
 * /permission/update:
 *   post:
 *     summary: Update Permission.
 *     description: Mengubah Data Pemission user, salah satu field wajib di-isi.
 *     tags: [Permission]
 *     requestBody:
 *       required:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Permission'
 *     responses:
 *       201:
 *         description: Berhasil Mengubah Data Pemission user berdasarkan roles nya.
 *         content:
 *           application/json:
 *            schema:
 *       400:
 *         description: Gagal Mengubah Data Pemission user berdasarkan roles nya.
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
router.post('/update', permissionController.updatePermission)

/**
 * @swagger
 * /permission/delete:
 *   post:
 *     summary: Delete Permission.
 *     description: Menghapus Data Pemission user,.
 *     tags: [Permission]
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
 *         description: Berhasil Mengubah Data Pemission user berdasarkan roles nya.
 *         content:
 *           application/json:
 *            schema:
 *       400:
 *         description: Gagal Mengubah Data Pemission user berdasarkan roles nya.
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
router.post('/delete', permissionController.deletePermission)



module.exports = router