import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import userRoutes from './routes/user.routes'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT

//use routes
app.use("/user", userRoutes())



app.listen(PORT, ()=>{ console.log(`Server running in port ${PORT}`) })