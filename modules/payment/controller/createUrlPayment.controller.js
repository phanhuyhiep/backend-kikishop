import crypto from 'crypto'
import { sortObject } from "../service/payment.service.js"
import querystring from "querystring"
import configs from "../../../config/configVnpay.js"
import dateFormat from "dateformat"
import catchAsync from '../../../utils/catchAsync.js'

var tmnCode = configs.vnPay.tmnCode
var secretKey = configs.vnPay.secret
var vnpUrl = configs.vnPay.url
const createPayment = catchAsync(async (req, res) => {
    const { productOrder, infoOrder } = req.body

    var ipAddr = req.ipv4 || '127.0.0.1'

    var returnUrl = `${req.protocol}://${req.get('host')}/api/payment/vnpay/callback`

    var date = new Date()

    var createDate = dateFormat(date, 'yyyymmddHHmmss')
    var orderId = dateFormat(date, 'HHmmss')
    var bankCode = req.body.bankCode || 'NCB'

    var orderInfo = req.body.orderDescription || 'Thanh toan don hang'
    var orderType = req.body.orderType || 'other'
    var locale = req.body.language || 'vn'
    if (locale === null || locale === '') {
        locale = 'vn'
    }
    var currCode = 'VND'
    var vnp_Params = {}
    vnp_Params['vnp_Version'] = '2.1.0'
    vnp_Params['vnp_Command'] = 'pay'
    vnp_Params['vnp_TmnCode'] = tmnCode
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale
    vnp_Params['vnp_CurrCode'] = currCode
    vnp_Params['vnp_TxnRef'] = orderId
    vnp_Params['vnp_OrderInfo'] = orderInfo
    vnp_Params['vnp_OrderType'] = orderType
    vnp_Params['vnp_Amount'] = productOrder * 100
    vnp_Params['vnp_ReturnUrl'] = returnUrl
    vnp_Params['vnp_IpAddr'] = ipAddr
    vnp_Params['vnp_CreateDate'] = createDate
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode
    }

    vnp_Params = sortObject(vnp_Params)

    const queryStringBefore = queryStringData(vnp_Params)

    var hmac = crypto.createHmac('sha512', secretKey)
    var signed = hmac.update(Buffer.from(queryStringBefore, 'utf-8')).digest('hex')
    vnp_Params['vnp_SecureHash'] = signed

    const queryStringNew = queryStringData(vnp_Params)

    var redirectURL = (vnpUrl + '?' + queryStringNew)

    res.status(200).json(redirectURL)
})

export const queryStringData = (data) => {
    const result = Object.keys(data)
        .map(key => `${key}=${data[key]}`)
        .join('&');

    return result
}
export default createPayment
