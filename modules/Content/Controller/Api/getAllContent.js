import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import { getAllContent } from "../../Service/Content.js";
const getAllContents = catchAsync(async (req, res) => {
    const contents = await getAllContent()
    return res.status(status.OK).json(contents)
})
export default getAllContents