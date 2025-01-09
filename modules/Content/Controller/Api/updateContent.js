import catchAsync from "../../../../utils/catchAsync.js";
import { updateContent } from "../../Service/Content.js";
import status from "http-status"
const updateContents = catchAsync(async(req,res)=>{
    const contents = await updateContent(req)
    return res.status(status.OK).json(contents)
})
export default updateContents