import catchAsync from "../../../../utils/catchAsync.js";
import { searchComment_evaluates } from "../../Service/comment_evaluate.service.js";
import status from 'http-status'

const searchComment_evaluate = catchAsync(async(req, res)=>{
    const dataSearch = await searchComment_evaluates(req)
    if (dataSearch.length == 0) {
        return res.status(status.NOT_FOUND).json({
            message: "Không có danh mục nào phù hợp với từ khóa tìm kiếm",
        });
    }

    return res.status(status.OK).json(dataSearch)
})

export default searchComment_evaluate