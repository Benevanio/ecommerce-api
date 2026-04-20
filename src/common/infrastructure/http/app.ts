import { productsRouter } from '@/products/infrastructure/htpp/routes/products.routes'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import { errorHandler } from './middlewares/errorHandler'
import { routes } from './router'
import { swaggerSpec } from './swagger'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(routes)
app.use((err: Error, req: Request, res: Response, next: NextFunction) =>
  errorHandler(err, req, res, next),
)

app.use(productsRouter)
export { app }
