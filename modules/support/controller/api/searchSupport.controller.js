import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import { searchSupport } from "../../service/support.service.js";
const searchSupports = catchAsync(async (req, res) => {
    const search = await searchSupport(req)
    if (search.length === 0) {
        return res.status(status.NOT_FOUND).json({
            message: "Không có kết quả nào phù hợp với từ khóa tìm kiếm",
        });
    }
    else return res.status(status.OK).json(search);


})
export default searchSupports