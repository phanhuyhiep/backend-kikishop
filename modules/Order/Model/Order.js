import mongoose from "mongoose";


const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'Auth'
        // default: null,
    },
    voucherCode:String,
    fullname: String,
    phoneNumber: String,
    district: String,
    commune: String,
    locationDetail: String,
    defaultLocation: String,
    totalprice: Number,
    payment_methods: String,
    orderStatus: {
        type: String,
        default: 'đang chờ duyệt',
        enum: ['đang chờ duyệt', 'duyệt thành công', 'đang vận chuyển', 'hoàn thành', 'huỷ đơn'],
    },
    city: String,
    productOrder: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: "Product"
            },
            quantityOrder: {
                type: Object
            }
        }
    ]

},
    {
        timestamps: true
    }
)
export default mongoose.model("Order", orderSchema)