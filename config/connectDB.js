import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB connected ${db.connection.host}`);
    } catch (err) {
        console.log(`Error to connect db ${err.message}`);
    }
}

export default connectDB