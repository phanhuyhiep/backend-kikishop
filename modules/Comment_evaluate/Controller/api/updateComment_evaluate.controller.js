import catchAsync from "../../../../utils/catchAsync.js";
import { updateComment_evaluates } from "../../Service/comment_evaluate.service.js";
import status from 'http-status'

const updateComment_evaluate = catchAsync(async(req, res)=>{
    const comment = await updateComment_evaluates(req)
    return res.status(status.OK).json(comment)
})

export default updateComment_evaluate