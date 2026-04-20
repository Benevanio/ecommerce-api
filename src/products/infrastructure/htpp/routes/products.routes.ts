import { Router } from 'express'
import { createProductController } from '../controllers/create-product.controller'

const productsRouter = Router()

productsRouter.post('/products', createProductController)
productsRouter.get('/products', (req, res) => {
  return res.status(200).json({ message: 'List of products' })
})

export { productsRouter }
