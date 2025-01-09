import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import { searchOrder } from "../../service/orderService.js";
const searchOrders = catchAsync(async (req, res) => {
    const search = await searchOrder(req)
    if (search.length === 0) {
        return res.status(status.NOT_FOUND).json({
            message: "Không có đơn hàng nào phù hợp với từ khóa tìm kiếm",
        });
    }
    else return res.status(status.OK).json(search);


})
export default searchOrders