import express from 'express'
import cartController from '../modules/Cart/Controller/index.js'
import { veryfiletoken } from '../middlewares/authorization.js'

const router = express.Router()
router.use(veryfiletoken)
router.get('/', cartController.getAllCarts)
router.delete('/:productId', cartController.deleteCarts)
router.post("/edit", cartController.editCart)
router.post('/add', cartController.addCarts)
export default router

