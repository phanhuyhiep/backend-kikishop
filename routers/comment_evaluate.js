import express from "express"
import comment_evaluateController from '../modules/Comment_evaluate/Controller/index.js'
import { veryfiletoken } from "../middlewares/authorization.js"

const router = express.Router()
router.get('/search', comment_evaluateController.searchComment_evaluate)
router.get('/', comment_evaluateController.getAllComment_evaluate)
router.get('/:productId', comment_evaluateController.getComment_evaluate)

router.use(veryfiletoken)
router.post('/add', comment_evaluateController.createComment_avaluate)
router.delete('/delete/:id', comment_evaluateController.deleteComment_evaluate)
router.put('/update/:id', comment_evaluateController.updateComment_evaluate)
export default router

