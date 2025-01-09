import { veryfiletoken } from "../middlewares/authorization.js"
import supportController from "../modules/support/controller/index.js"
import express from "express"
const router = express.Router()
router.use(veryfiletoken)
router.post('/add', supportController.createSupport)
router.get('/', supportController.getAllSupport)
router.get('/search', supportController.searchSupports)
router.put('/update/:id', supportController.updateSupport)
router.delete('/delete/:id', supportController.deleteSupport)
router.post('/repsupport', supportController.repSupport)
export default router