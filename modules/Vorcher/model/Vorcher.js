import mongoose from "mongoose";

const vorcherSchema = mongoose.Schema({
    name:String,
    discount: Number,
    type:String,
    code: String,
    startday: String,
    endday: String,
    status: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    }
)
export default mongoose.model("Vorcher", vorcherSchema)