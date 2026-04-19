import { InMemoryProductsRepository } from '@/products/infrastructure/in-memory/repositories/in-memory.repository.products'
import { ProductsRepository } from '@/products/repositories/product.repository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { CreateProductUseCase } from './create-product.usecase'

describe('Create Product Use Case', () => {
  let suit: CreateProductUseCase.Usecase
  let repoository: ProductsRepository
  beforeEach(() => {
    repoository = new InMemoryProductsRepository()
    suit = new CreateProductUseCase.Usecase(repoository)
  })

  it('should create a product successfully', () => {
    const input: CreateProductUseCase.input = {
      name: 'Test Product',
      price: 100,
      quantity: 10,
    }
    suit.execute(input).then(output => {
      expect(output).toHaveProperty('id')
      expect(output.name).toBe(input.name)
      expect(output.price).toBe(input.price)
      expect(output.quantity).toBe(input.quantity)
      expect(output).toHaveProperty('created_at')
      expect(output).toHaveProperty('updated_at')
    })
  })
})
