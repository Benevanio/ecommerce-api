import { Router } from 'express'
import { createProductController } from '../controllers/create-product.controller'

const productsRouter = Router()

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um produto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - quantity
 *             properties:
 *               name:
 *                 type: string
 *                 example: product 0001
 *               price:
 *                 type: number
 *                 example: 200
 *               quantity:
 *                 type: number
 *                 example: 10
 *     responses:
 *       201:
 *         description: Produto criado
 *       400:
 *         description: Erro de validação
 */
productsRouter.post('/products', createProductController)

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lista produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
productsRouter.get('/products', (req, res) => {
  return res.status(200).json({ message: 'Listagem de produtos' })
})

export { productsRouter }
