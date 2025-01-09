import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import { searchProduct } from "../../Service/Product.js";
const searchProducts = catchAsync(async (req, res) => {
    const search = await searchProduct(req)
    if (search.length === 0) {
        return res.status(status.NOT_FOUND).json({
            message: "Không có sản phẩm nào phù hợp với từ khóa tìm kiếm",
        });
    }
    else return res.status(status.OK).json(search);


})
export default searchProducts