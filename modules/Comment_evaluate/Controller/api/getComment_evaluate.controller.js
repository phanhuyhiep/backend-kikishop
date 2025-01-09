import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import {getComment_evaluates } from "../../Service/comment_evaluate.service.js";

const getComment_evaluate = catchAsync(async(req,res)=>{
    const productId = req.params.productId;
    const comment = await getComment_evaluates(productId)
    return res.status(status.OK).json(comment)
})

export default getComment_evaluate