import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT

app.listen(PORT, ()=>{ console.log(`Server running in port ${PORT}`) })