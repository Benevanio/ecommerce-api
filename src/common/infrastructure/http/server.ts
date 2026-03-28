import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
const app = express()
dotenv.config()
const Port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`)
})
