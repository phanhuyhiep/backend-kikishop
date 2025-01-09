import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import { getAllCart } from "../../Service/Cart.js";
const getAllCarts = catchAsync(async (req, res) => {
    const Cart = await getAllCart(req)
    return res.status(status.OK).json(Cart)
})
export default getAllCarts