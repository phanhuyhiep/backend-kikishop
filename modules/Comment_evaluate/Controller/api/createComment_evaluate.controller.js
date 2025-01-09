
import catchAsync from "../../../../utils/catchAsync.js";
import Order from "../../../Order/Model/Order.js";
import { createComment_avaluates } from "../../Service/comment_evaluate.service.js";
import status from 'http-status'

const createComment_avaluate = catchAsync(async (req, res) => {
    const bodyData = {
        userId: req.body.userId,
        productId: req.body.productId,
        comment: req.body.comment,
        star: req.body.star
    }
      const userHasPurchased = await Order.findOne({
        user: bodyData.userId,
        orderStatus: "hoàn thành",
        "productOrder.product": bodyData.productId
    })

    if (!userHasPurchased) {
        return res.status(status.BAD_REQUEST).json("khách hàng phải mua sản phẩm để thực hiện tính năng này")
    }
    await createComment_avaluates(bodyData)
    return res.status(status.OK).json('Đã bình luận thành công!')
})

export default createComment_avaluate