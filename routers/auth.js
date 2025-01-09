import authController from "../modules/Auth/Controller/index.js";
import express from 'express'

const router = express.Router()

router.post('/register', authController.registers)
router.post('/signin', authController.signIn)
router.get('/', authController.getAllUser)
router.get('/search', authController.searchUsers)
router.get('/:id', authController.getOneUser)
router.delete('/:id', authController.deleteUser)
router.put('/update/:id', authController.updateUser)
router.post('/sendEmail', authController.sendEmail)
router.get('/user-detail', authController.getUserDetail)
export default router

