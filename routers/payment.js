import express from 'express'

import getStatusPayment from '../modules/payment/controller/getStatusPayment.controller.js'
import createPayment from '../modules/payment/controller/createUrlPayment.controller.js'

const router = express.Router()
router.post('/create_payment_url', createPayment)
router.get('/vnpay/callback', getStatusPayment)
export default router