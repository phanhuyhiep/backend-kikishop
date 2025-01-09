import mongoose from "mongoose";
const supportSchema = mongoose.Schema({
    name: String,
    phoneNumber: Number,
    email: String,
    topic: String,
    note: String
},
    {
        timestamps: true
    })
export default mongoose.model('Support', supportSchema)
