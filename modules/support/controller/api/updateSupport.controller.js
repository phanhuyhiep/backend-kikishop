import catchAsync from "../../../../utils/catchAsync.js";
import { updateSupports } from "../../service/support.service.js";
import status from 'http-status'

const updateSupport = catchAsync(async(req,res)=>{
    const support = await updateSupports(req)
    return res.status(status.OK).json(support)
})

export default updateSupport