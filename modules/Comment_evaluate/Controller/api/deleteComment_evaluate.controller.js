import catchAsync from "../../../../utils/catchAsync.js";
import { deleteComment_evaluates } from "../../Service/comment_evaluate.service.js";
import status from "http-status";

const deleteComment_evaluate = catchAsync(async(req, res)=>{
    const comment = await deleteComment_evaluates(req)
    return res.status(status.OK).json(comment)
})

export default deleteComment_evaluate