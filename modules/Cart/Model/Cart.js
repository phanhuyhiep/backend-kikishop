import mongoose from 'mongoose';
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'Auth',
    },
    carts: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: "Product",
            },
            quantityOrder: {
                nameColor: String,
                nameSize: String,
                quantity: Number
            }
        }
    ],

}, {
    timestamps: true
});

export default mongoose.model('Cart', cartSchema);


