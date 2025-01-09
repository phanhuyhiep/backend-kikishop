import catchAsync from "../../../../utils/catchAsync.js";
import { createSupports } from "../../service/support.service.js";
import status from 'http-status'
const createSupport = catchAsync(async(req,res)=>{
    const support = await createSupports(req)
    return res.status(status.OK).json(support)
})

export default createSupport