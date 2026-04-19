/* eslint-disable prettier/prettier */
import { BadRequestError } from '@/common/domain/errors/bad-request-error';
import { CreateProductUseCase } from '@/products/application/usecase/create-product.usecase';
import { Request, Response } from 'express';
import { z } from 'zod';
export async function createProductController(
  request: Request,
  response: Response,
) {
  const createProductBodySchema = z.object({
    name: z.string().min(1, 'Name is required'),
    price: z.number().positive('Price must be a positive number'),
    quantity: z.number().int().positive('Quantity must be a positive integer'),
  })
  const validatedBody = createProductBodySchema.safeParse(request.body)
  if (!validatedBody.success) {
    const errors = validatedBody.error.errors.map(err => err.message)
    return response.status(BadRequestError.prototype.statusCode).json({ error: errors.join(', ') })
  }
  const { name, price, quantity } = validatedBody.data
  try {
    const useCase = new CreateProductUseCase.Usecase()
    const output = await useCase.execute({ name, price, quantity })
    return response.status(201).json(output)
  } catch (error) {
    if (error instanceof BadRequestError) {
      return response.status(BadRequestError.prototype.statusCode).json({ error: error.message })
    }
    console.error('Error creating product:', error)
    return response.status(500).json({ error: 'Internal Server Error' })
  }
}
