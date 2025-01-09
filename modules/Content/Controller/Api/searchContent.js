import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import { searchContents } from "../../Service/Content.js";

const searchContent = catchAsync(async (req, res) => {
    const dataSearch = await searchContents(req)
    if (dataSearch.length == 0) {
        return res.status(status.NOT_FOUND).json({
            message: "Không có danh mục nào phù hợp với từ khóa tìm kiếm",
        });
    }

    return res.status(status.OK).json(dataSearch)
})

export default searchContent