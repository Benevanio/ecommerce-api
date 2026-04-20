import { Router } from 'express'
import { createProductController } from '../controllers/create-product.controller'

const productsRouter = Router()

productsRouter.post('/products', createProductController)
productsRouter.get('/products', (req, res) => {
  const body = req.body
  return res.status(200).json({ message: 'Listagem de produtos', body })
})

export { productsRouter }
