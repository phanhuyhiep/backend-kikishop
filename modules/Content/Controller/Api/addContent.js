import { addContent } from '../../Service/Content.js';
import status from 'http-status'
import catchAsync from "../../../../utils/catchAsync.js";
const addContents = catchAsync(async (req, res) => {
    const contents = await addContent(req)
    return res.status(status.OK).json(contents)
})
export default addContents