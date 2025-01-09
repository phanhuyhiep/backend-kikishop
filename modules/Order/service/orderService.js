import Order from "../Model/Order.js"
import Cart from "../../Cart/Model/Cart.js"
import ProductModel from "../../Product/Model/Product.js"

export const addOder = async (req) => {
    const listProductOrder = req.body.productOrder;
    const userId = req.user ? req.user.id : null;
    if (req.user) {
        const cartUser = await Cart.findOne({ user: req.user._id });
        if (cartUser) {
            const filterArray = cartUser.carts.filter(
                (itemCart) => listProductOrder.filter(
                    (itemListProduct) => itemListProduct.product._id === String(itemCart.product) &&
                        itemListProduct.quantityOrder.nameSize == itemCart.quantityOrder.nameSize &&
                        itemListProduct.quantityOrder.nameColor == itemCart.quantityOrder.nameColor
                ).length === 0
            );

            for (let index = 0; index < listProductOrder.length; index++) {
                const element = listProductOrder[index];
                const productOrder = element.quantityOrder;
                const productDetail = await ProductModel.findOne({
                    _id: element.product
                });

                const findObjectRemain = productDetail.listQuantityRemain.find(
                    (item) => item.nameColor == productOrder.nameColor && item.nameSize == productOrder.nameSize
                );
                findObjectRemain.quantity = findObjectRemain.quantity - productOrder.quantity;
                await productDetail.save();
            }

            cartUser.carts = filterArray;
            await cartUser.save();
        }

    } else {
        for (let index = 0; index < listProductOrder.length; index++) {
            const element = listProductOrder[index];
            const productOrder = element.quantityOrder;
            const productDetail = await ProductModel.findOne({
                _id: element.product
            });

            const findObjectRemain = productDetail.listQuantityRemain.find(
                (item) => item.nameColor == productOrder.nameColor && item.nameSize == productOrder.nameSize
            );
            findObjectRemain.quantity = findObjectRemain.quantity - productOrder.quantity;
            await productDetail.save();
        }
    }
    const newOrder = await Order.create({
        user: userId,
        ...req.body
    });

    return newOrder;
}
export const updateOrder = async (req) => {
    const { orderStatus, orderId } = req.body
    const order = await Order.findOne({ _id: orderId })
    order.orderStatus = orderStatus
    await order.save()
    if (orderStatus === 'huỷ đơn') {
        for (let i = 0; i < order.productOrder.length; i++) {
            const productOrder = order.productOrder[i];
            const productDetail = await ProductModel.findById(productOrder.product);
            const quantityCancelled = productOrder.quantityOrder.quantity;
            const findObjectRemain = productDetail.listQuantityRemain.find(
                (item) => item.nameColor === productOrder.quantityOrder.nameColor &&
                    item.nameSize === productOrder.quantityOrder.nameSize
            );
            findObjectRemain.quantity += quantityCancelled;
            await productDetail.save();
        }
    }

    return order
}

export const getAllOrders = async (req) => {
    const orders = await Order.find({
        user: req.user.id,
    }).populate({
        path: 'productOrder',
        populate: {
            path: 'product',
        },
    })

    return orders
}

export const getAllOrderAdmins = async (req) => {
    const orderAdmin = await Order.find().populate({
        path: 'productOrder',
        populate: {
            path: 'product',
        },
    })
    return orderAdmin
}

export const deleteUsers = async (req) => {
    const remove = await Order.findByIdAndDelete(req.params.id)
    return remove
}
export const searchOrder = async (req, res) => {
    const { fullname } = req.query;
    const searchRegex = new RegExp(fullname, "i");
    const orders = await Order.find({ fullname: searchRegex }).populate({
        path: 'productOrder',
        populate: {
            path: 'product',
        },
    });
    return orders
};

export const filterDataOrderByStatus = async (queryRequest) => {
    const { status, keyword } = queryRequest;

    let matchStage = { "orderStatus": { $in: [status] } };

    if (keyword) {
        matchStage = {
            $or: [
                { fullname: { $regex: keyword, $options: 'i' } },
                { phoneNumber: { $regex: keyword, $options: 'i' } }
            ],
            $and: [matchStage]
        };
    }

    const orders = await Order.aggregate([
        {
            $match: matchStage
        },
        {
            $unwind: "$productOrder"
        },
        {
            $lookup: {
                from: "products",
                localField: "productOrder.product",
                foreignField: "_id",
                as: "productInfo"
            }
        },
        {
            $unwind: "$productInfo"
        },
        {
            $set: {
                "productOrder.product": "$productInfo"
            }
        },
        {
            $group: {
                _id: "$_id",
                fullname: { $first: "$fullname" },
                totalprice: { $first: "$totalprice" },
                phoneNumber: { $first: "$phoneNumber" },
                district: { $first: "$district" },
                city: { $first: "$city" },
                commune: { $first: "$commune" },
                locationDetail: { $first: "$locationDetail" },
                productOrder: { $push: "$productOrder" },
                createdAt: { $first: "$createdAt" },
                updatedAt: { $first: "$updatedAt" },
                orderStatus: { $first: "$orderStatus" },
                payment_methods: { $first: "$payment_methods" },
                __v: { $first: "$__v" }
            }
        }
    ]);

    return orders;
}
