import Product from "../../Product/Model/Product.js"
import Order from "../../Order/Model/Order.js"
export const getStatistics = async () => {
    const orders = await Order.find();

    const productPurchaseCount = {};

    orders.forEach(order => {
        order.productOrder.forEach(item => {
            const productId = item.product._id;
            const quantity = item.quantityOrder.quantity;
            if (productPurchaseCount[productId]) {
                productPurchaseCount[productId] += quantity;
            } else {
                productPurchaseCount[productId] = quantity;
            }
        });
    });

    const products = await Product.find();

    const result = products.map(product => ({
        name: product.name,
        totalSold: productPurchaseCount[product._id] || 0
    }));

    result.sort((a, b) => b.totalSold - a.totalSold);

    return result;
}

export const statisticsMonneys = async (bodyRequest) => {
    const { startDate, endDate } = bodyRequest

    let startDateConvert = new Date(startDate);
    let endDateConvert = new Date(endDate);

    let boundaries = [startDateConvert]
    while (boundaries.slice(-1)[0] <= endDateConvert) {
        boundaries.push(
            new Date(new Date(boundaries.slice(-1)[0]).getTime() + (1000 * 60 * 60 * 24))
        )
    }

    const listOrderChart = await Order.aggregate([
        {
            $match: {
                $and: [
                    { "createdAt": { $gte: startDateConvert, $lte: endDateConvert } }
                ]
            }
        },
        {
            $bucket: {
                boundaries: boundaries,
                groupBy: "$createdAt",
                default: "other",
                output: {
                    subtotal: { $sum: 1 },
                    totalPrice: { $sum: "$totalprice" },
                }
            }
        },
        {
            $densify: {
                field: "_id",
                range: {
                    step: 1,
                    unit: "day",
                    bounds: [startDateConvert, new Date(endDateConvert.setDate(endDateConvert.getDate() + 1))],
                }
            }
        },
        {
            $project: {
                totalprice: { $ifNull: ["$totalprice", 0] },
                subtotal: { $ifNull: ["$subtotal", 0] },
                date: { $dateToString: { format: "%Y-%m-%d", date: "$_id" } },
                _id: 0,
            }
        }

    ])

    const orders = await Order.aggregate([
        {
            $match: {
                $and: [
                    { "createdAt": { $gte: startDateConvert, $lte: endDateConvert } },
                ]
            }
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
                productOrder: { $push: "$productOrder" },
                totalprice: { $first: "$totalprice" },
                payment_methods: { $first: "$payment_methods" },
                orderStatus: { $first: "$orderStatus" },
                createdAt: { $first: "$createdAt" },
                updatedAt: { $first: "$updatedAt" },
                __v: { $first: "$__v" }
            }
        }
    ])
    const totalQuantity = orders.reduce((total, order) => {
        if (order.orderStatus === 'hoàn thành') {
            return total + order.totalprice;
        }
        return total;
    }, 0);

    return { listOrderChart, orders, totalQuantity }
}
