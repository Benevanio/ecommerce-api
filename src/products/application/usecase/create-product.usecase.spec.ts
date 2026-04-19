import { InMemoryProductsRepository } from '@/products/infrastructure/in-memory/repositories/in-memory.repository.products'
import { ProductsRepository } from '@/products/repositories/product.repository'
import { describe } from '@jest/globals'
import { beforeEach, it } from 'node:test'
import { CreateProductUseCase } from './create-product.usecase'

describe('Create Product Use Case', () => {
  let suit: CreateProductUseCase.Usecase
  let repoository: ProductsRepository
  beforeEach(() => {
    repoository = new InMemoryProductsRepository()
    suit = new CreateProductUseCase.Usecase(repoository)
  })

  it('should create a product successfully', () => {})
})
