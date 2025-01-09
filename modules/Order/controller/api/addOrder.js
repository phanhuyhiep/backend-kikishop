import catchAsync from "../../../../utils/catchAsync.js";
import { addOder } from "../../service/orderService.js";
import status from 'http-status';

const addOrders = catchAsync(async (req, res) => {
    const orderData = await addOder(req)
    return res.status(status.OK).json(orderData)
})
export default addOrders