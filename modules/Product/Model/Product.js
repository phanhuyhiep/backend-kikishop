import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
    {
        name: String,
        code: String,
        price: Number,
        cost: Number,
        description: String,
        images: {
            type: Array,
            default: [],
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'Auth',
        },
        brand: String,
        listQuantityRemain: [
            {
                colorHex: String,
                nameColor: String,
                nameSize: String,
                quantity: Number,
            },
        ],
        categoryId: {
            _id: {
                type: mongoose.Types.ObjectId,
                ref: 'Category',
            },
            name: String
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
    },
)

export default mongoose.model('Product', productSchema)