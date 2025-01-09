import mongoose from "mongoose";
const categorySchema = mongoose.Schema({
    name: String,
    status: Boolean
},
    {
        timestamps: true
    })
export default mongoose.model('Category', categorySchema)
