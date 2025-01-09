import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import { getAllComment_evaluates } from "../../Service/comment_evaluate.service.js";

const getAllComment_evaluate = catchAsync(async(req,res)=>{
    const comment = await getAllComment_evaluates(req)
    return res.status(status.OK).json(comment)
})

export default getAllComment_evaluate