import catchAsync from "../../../../utils/catchAsync.js";
import { getAllSupports } from "../../service/support.service.js";
import status from 'http-status'

const getAllSupport = catchAsync(async(req,res)=>{
    const suppport = await getAllSupports()
    return res.status(status.OK).json(suppport)
})

export default getAllSupport