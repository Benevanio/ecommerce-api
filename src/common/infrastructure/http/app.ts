import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import SwaggerUI from 'swagger-ui-express'
import { errorHandler } from './middlewares/errorHandler'
import { routes } from './router'

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'api ecommerce',
      version: '1.0.0',
      description: 'API para gerenciamento de vendas',
    },
  },
  apis: [],
})
const app = express()

app.use(express.json())
app.use(cors())
app.use('/docs', SwaggerUI.serve, SwaggerUI.setup(swaggerSpec))
app.use(routes)
app.use((err: Error, req: Request, res: Response, next: NextFunction) =>
  errorHandler(err, req, res, next),
)

export { app }
