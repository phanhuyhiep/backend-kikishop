import catchAsync from "../../../../utils/catchAsync.js";
import { deleteSupports } from "../../service/support.service.js";
import status from 'http-status'

const deleteSupport = catchAsync(async(req, res)=>{
    const support = await deleteSupports(req)
    return res.status(status.OK).json(support)
})

export default deleteSupport