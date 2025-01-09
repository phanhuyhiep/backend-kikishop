import express from 'express'
import { checkUserStoreAndAdminAuthorization, veryfiletoken } from '../middlewares/authorization.js'
import vorcherController from '../modules/Vorcher/controller/index.js'

const router = express.Router()
router.get("/", vorcherController.getAllVorcher)
router.use(veryfiletoken)

router.get("/search", vorcherController.searchVouchers)
router.use(checkUserStoreAndAdminAuthorization)
router.post("/add", vorcherController.createVorcher)
router.post("/delete/:id", vorcherController.deleteVorcher)
router.put('/update/:id', vorcherController.updateVorcher)

export default router 