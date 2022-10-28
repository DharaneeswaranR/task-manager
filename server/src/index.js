import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import './db/mongoose.js'
import userRoute from './routes/user.js'
import taskRoute from './routes/task.js'

dotenv.config()

const app = express()
// const corsOptions = {
//     origin: true, //included origin as true
//     credentials: true, //included credentials as true
// }
app.use(cors())
app.use(express.json())
app.use(userRoute)
app.use(taskRoute)

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT)
})