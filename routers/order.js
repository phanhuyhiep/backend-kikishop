import express from 'express'
import controllerOrder from '../modules/Order/controller/index.js'
import { veryfiletoken } from '../middlewares/authorization.js'

const router = express.Router()
router.use(veryfiletoken)
router.post('/add', controllerOrder.addOrders)
router.post('/edit', controllerOrder.updateOders)
router.get('/', controllerOrder.getAllOrder)
router.get('/search', controllerOrder.searchOrders)
router.get('/orderadmin', controllerOrder.getAllOrderAdmin)
router.delete('/:id', controllerOrder.deleteUser)
router.get('/filter-data-status', controllerOrder.filterDataOrderByStatuss)
export default router