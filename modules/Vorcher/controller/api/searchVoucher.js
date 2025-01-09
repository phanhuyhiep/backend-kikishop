import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import { searchVoucher } from "../../service/Service.js";
const searchVouchers = catchAsync(async (req, res) => {
    const search = await searchVoucher(req)
    if (search.length === 0) {
        return res.status(status.NOT_FOUND).json({
            message: "Không có voucher nào phù hợp với từ khóa tìm kiếm",
        });
    }
    else return res.status(status.OK).json(search);


})
export default searchVouchers