import catchAsync from "../../../../utils/catchAsync.js"
import status from 'http-status'
import { repSupports } from "../../service/support.service.js"
const repSupport = catchAsync(async(req,res)=> {
    const sendEmail = await repSupports(req)
    return res.status(status.OK).json(sendEmail)
})
export default repSupport