import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import { getAllOrderAdmins } from "../../service/orderService.js";
const getAllOrderAdmin = catchAsync(async (req, res )=>{
    const orderAdmin = await getAllOrderAdmins(req)
    return res.status(status.OK).json(orderAdmin)
})
export default getAllOrderAdmin