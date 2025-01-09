import express from "express"
import cors from "cors"
import connectDB from "./config/connectDB.js"
import dotenv from "dotenv"
import router from "./routers/router.js"
dotenv.config()
const app = express()
app.use(cors())
app.use((req, _, next) => {
    req.headers.origin = req.headers.origin || req.headers.host;
    if (!req.headers.origin.startsWith('http')) {
        req.headers.origin = req.protocol + '://' + req.headers.origin;
    }

    req.ipv4 = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    next();
});
app.use(express.json())

connectDB()

// app.use('/api/v1', routes)
app.use("/api", router)

const PORT = process.env.PORT || 8001

app.get('/', (req, res) => {
    return res.send('Start server success!')
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})