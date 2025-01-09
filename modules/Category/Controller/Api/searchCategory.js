import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import { searchCategory } from "../../Service/Category.js";
const searchCategories = catchAsync(async (req, res) => {
    const search = await searchCategory(req)
    if (search.length === 0) {
        return res.status(status.NOT_FOUND).json({
            message: "Không có danh mục nào phù hợp với từ khóa tìm kiếm",
        });
    }
    else return res.status(status.OK).json(search);


})
export default searchCategories