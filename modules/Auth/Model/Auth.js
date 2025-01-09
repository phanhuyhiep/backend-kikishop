import mongoose from 'mongoose'
const authSchema = mongoose.Schema({
    fullname: String,
    nickname: String,
    email: {
        type: String,
        default: '',
        unique: true
    },
    birthday: {
        type: Date
    },
    phoneNumber: {
        type: String,
        default: '',
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 8
    },
    gender: {
        type: String,
        enum: ["Nam", "Nữ", "Khác"],
        default: "Khác"
    },
    address: {
        type: String,
        default: "",
        require: true
    },
    role: {
        type: String,
        enum: ["USER", "USER_STORE", "ADMIN"],
        default: "USER"
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})
export default mongoose.model("Auth", authSchema)