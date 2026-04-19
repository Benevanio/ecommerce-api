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

  it('should create a product successfully', async () => {
    const input: CreateProductUseCase.input = {
      name: 'Test Product',
      price: 100,
      quantity: 10,
    }
    const output = await suit.execute(input)
    expect(output).toHaveProperty('id')
    expect(output.name).toBe(input.name)
    expect(output.price).toBe(input.price)
    expect(output.quantity).toBe(input.quantity)
    expect(output).toHaveProperty('created_at')
    expect(output).toHaveProperty('updated_at')
  })
  it('should throw an error if name is missing', async () => {
    const input: CreateProductUseCase.input = {
      name: '',
      price: 100,
      quantity: 10,
    }
    await expect(suit.execute(input)).rejects.toThrow(
      'Name, price and quantity are required',
    )
  })

  it('should throw an error if price is missing', async () => {
    const input: CreateProductUseCase.input = {
      name: 'Test Product',
      price: 0,
      quantity: 10,
    }
    expect(suit.execute(input)).rejects.toThrow(
      'Name, price and quantity are required',
    )
  })

  it('should throw an error if quantity is missing', async () => {
    const input: CreateProductUseCase.input = {
      name: 'Test Product',
      price: 100,
      quantity: 0,
    }
    await expect(suit.execute(input)).rejects.toThrow(
      'Name, price and quantity are required',
    )
  })
})
