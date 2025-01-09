import express from 'express'
import productController from '../modules/Product/Controller/index.js'
import upload from '../config/configImage.js'
import { checkUserStoreAndAdminAuthorization, veryfiletoken } from '../middlewares/authorization.js'

const router = express.Router()
router.get("/search", productController.searchProducts)
router.get("/", productController.getAllProducts)
router.get("/:id", productController.getOneproducts)
router.use(veryfiletoken)
router.use(checkUserStoreAndAdminAuthorization)
router.use(upload.array('file', 5))
router.delete("/:id", productController.deleteProducts)
router.post("/add", productController.addProducts)
router.put("/edit/:id", productController.editProduct)

export default router 