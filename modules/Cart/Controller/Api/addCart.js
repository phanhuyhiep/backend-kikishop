import catchAsync from "../../../../utils/catchAsync.js";
import { addCart } from "../../Service/Cart.js";
import status from "http-status"
import productModel from "../../../Product/Model/Product.js"
import Cart from "../../Model/Cart.js";
const addCarts = catchAsync(async (req, res) => {
       const bodyRequet = {
        userId: req.user.id,
        productId: req.body.productId,
        quantityOrder: req.body.quantityOrder
    }

    const productLocal = await productModel.findOne({
        _id: bodyRequet.productId
    })
    const cartUser = await Cart.findOne({
        user: bodyRequet.userId
    })
    const findObjectQuantity = productLocal?.listQuantityRemain?.find(
        (item) =>
            item.nameSize === bodyRequet.quantityOrder.nameSize &&
            item.nameColor === bodyRequet.quantityOrder.nameColor,
    )


    if (bodyRequet.quantityOrder.quantity > findObjectQuantity.quantity) {
        return res.status(status.BAD_REQUEST).json('Đã vượt quá số lượng')
    }
    if (cartUser) {
        const findProduct = cartUser.carts.find(
            (item) =>
                String(item.product) === bodyRequet.productId &&
                item.quantityOrder.nameSize === bodyRequet.quantityOrder.nameSize &&
                item.quantityOrder.nameColor === bodyRequet.quantityOrder.nameColor,
        )

        const findObjectRemainWithColor = productLocal.listQuantityRemain.find(
            (item) => item.nameColor === bodyRequet.quantityOrder.nameColor,
        )
        if (findProduct) {
            if (findObjectRemainWithColor) {
                if (
                    findObjectRemainWithColor.quantity < bodyRequet.quantityOrder.quantity ||
                    findProduct.quantityOrder.quantity + bodyRequet.quantityOrder.quantity >
                    findObjectRemainWithColor.quantity
                ) {
                    return res.status(status.BAD_REQUEST).json('Đã vượt quá số lượng')
                }
            }
        }

    }

    await addCart(bodyRequet)
    return res.status(status.OK).json("THM SP THÀNH CÔNG")
})

export default addCarts