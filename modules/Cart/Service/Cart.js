import Cart from "../Model/Cart.js"

export const deleteCart = async (bodyRequet) => {
    const cart = await Cart.findOne({
        user: bodyRequet.userId
    })
    const newcart = cart.carts.findIndex((item) => String(item._id) == bodyRequet.productId)
    if (newcart > -1) {
        cart.carts.splice(newcart, 1)
    }
    await cart.save()
}


export const getAllCart = async (req) => {
    const cart = await Cart
        .findOne({
            user: req.user.id,
        })
        .populate({
            path: 'carts',
            populate: {
                path: 'product',
            },
        })

    return cart

}
export const addCart = async (bodyRequet) => {
    const product = {
        product: bodyRequet.productId,
        quantityOrder: bodyRequet.quantityOrder,
    }

    const cartUser = await Cart.findOne({
        user: bodyRequet.userId,
    })
    if (cartUser) {
        const findProduct = cartUser.carts.find(
            (item) =>
                String(item.product) === bodyRequet.productId &&
                item.quantityOrder.nameSize === bodyRequet.quantityOrder.nameSize &&
                item.quantityOrder.nameColor === bodyRequet.quantityOrder.nameColor,
        )

        if (findProduct) {
            findProduct.quantityOrder.quantity =
                findProduct.quantityOrder.quantity + bodyRequet.quantityOrder.quantity
        } else {
            cartUser.carts.push(product)
        }

        await cartUser.save()
    } else {
        const newCart = new Cart({
            user: bodyRequet.userId,
        })

        newCart.carts.push(product)
        await newCart.save()
    }
}
export const updateCart = async (bodyRequet) => {
    const cartUser = await Cart.findOne({
        user: bodyRequet.userId,
    })
    if (cartUser) {
        const findProduct = cartUser.carts.find((item) => String(item.product) == bodyRequet.productId)
        findProduct.quantityOrder = bodyRequet.quantityOrder
        await cartUser.save()
    }
}