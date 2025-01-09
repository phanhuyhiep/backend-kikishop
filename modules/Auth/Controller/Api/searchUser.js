import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import { searchUser } from "../../service/Auth.js";
const searchUsers = catchAsync(async (req, res) => {
    const search = await searchUser(req)
    if (search.length === 0) {
        return res.status(status.NOT_FOUND).json({
            message: "Không có kết quả nào phù hợp với từ khóa tìm kiếm",
        });
    }
    else return res.status(status.OK).json(search);


})
export default searchUsers