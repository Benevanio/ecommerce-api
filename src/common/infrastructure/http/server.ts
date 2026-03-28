import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { routes } from './router'
const app = express()
dotenv.config()
const Port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use(routes) 
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`)
})
