import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import { errorHandler } from './middlewares/errorHandler'
import { routes } from './router'
const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)
app.use((err: Error, req: Request, res: Response, next: NextFunction) =>
  errorHandler(err, req, res, next),
)

export { app }
