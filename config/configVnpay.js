import dotenv from "dotenv"
dotenv.config()
const configs = {
    vnPay: {
        secret: process.env.VNPAY_SECRET,
        tmnCode: process.env.VNPAY_TMN_CODE,
        url: process.env.VNPAY_URL,
    },
}
export default configs