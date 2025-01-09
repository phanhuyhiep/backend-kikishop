import { removeContent } from '../../Service/Content.js';
import status from 'http-status'
import catchAsync from "../../../../utils/catchAsync.js";

const removeContents = catchAsync(async (req, res) => {
    const remove = await removeContent(req)
    return res.status(status.OK).json(remove)
})
export default removeContents