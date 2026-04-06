/* eslint-disable prettier/prettier */
import { ProductsTypeormRepository } from '@/products/infrastructure/typeorm/repositories/products-typeorm.repository'
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from '@jest/globals'
import { testDataSource } from '../../../../common/infrastructure/typeorm/testing/data-source'

describe('ProductsTypeormRepository integration tests', () => {
  let productsRepository: ProductsTypeormRepository

  beforeAll(async () => {
    if (!testDataSource.isInitialized) {
      await testDataSource.initialize()
    }
  })

  afterAll(async () => {
    if (testDataSource.isInitialized) {
      await testDataSource.destroy()
    }
  })
  beforeEach(async () => {
    await testDataSource.manager.query('DELETE FROM products')
    productsRepository = new ProductsTypeormRepository(testDataSource)
  })

  describe('method', () => {
    it('should insert a product and find it by id', async () => {
      const product = {
        name: 'Test Product',
        price: 10.99,
        quantity: 100,
      }
      const insertedProduct = await productsRepository.insert(product as any)
      const foundProduct = await productsRepository.findById(insertedProduct.id)

      expect(insertedProduct.id).toBeDefined()
      expect(foundProduct).toMatchObject(product)
    })
  })

  describe('creating a product with a conflicting name', () => {
    it('should return true for conflicting name', async () => {
      const product = {
        name: 'Unique Product',
        price: 20.99,
        quantity: 50,
      }
      await productsRepository.insert(product as any)
      const isConflicting =
        await productsRepository.conflictingName('Unique Product')

      expect(isConflicting).toBe(true)
    })
  })

  describe('Delete', () => {
    it('should delete a product by id', async () => {
      const product = {
        name: 'Product to Delete',
        price: 15.99,
        quantity: 30,
      }
      const insertedProduct = await productsRepository.insert(product as any)

      await productsRepository.delete(insertedProduct.id)

      await expect(productsRepository.findById(insertedProduct.id)).rejects.toThrow(
        `Product with ID ${insertedProduct.id} not found`,
      )
    })
  })
  describe('findByName', () => {
    it('should find a product by name', async () => {
      const product = {
        name: 'Product to Find',
        price: 25.99,
        quantity: 20,
      }
      await productsRepository.insert(product as any)
      const foundProduct =
        await productsRepository.findByName('Product to Find')

      expect(foundProduct).toMatchObject(product)
    })
  })
})

