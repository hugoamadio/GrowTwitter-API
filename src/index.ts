import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import userRoutes from './routes/user.routes'
import tweetRoutes from './routes/tweet.routes'
import likeRoutes from './routes/like.routes'
import authRoutes from './routes/auth.routes'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT

//use routes
app.use("/user", userRoutes())
app.use("/tweet", tweetRoutes())
app.use("/like", likeRoutes())
app.use("/auth", authRoutes())



app.listen(PORT, ()=>{ console.log(`Server running in port ${PORT}`) })