/* eslint-disable prettier/prettier */
import { ProductsTypeormRepository } from '@/products/infrastructure/typeorm/repositories/products-typeorm.repository'
import { after, before, beforeEach, describe, it } from 'node:test'
import { testDataSource } from '../../../../common/infrastructure/typeorm/testing/data-source'

describe('ProductsTypeormRepository integration tests', () => {
  let productsRepository: ProductsTypeormRepository

  before(async () => {
    await testDataSource.initialize()
  })

  after(async () => {
    await testDataSource.destroy()
  })
  beforeEach(async () => {
    await testDataSource.manager.query('DELETE FROM products')
    productsRepository = new ProductsTypeormRepository()
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
      console.log('Inserted Product:', insertedProduct)
      console.log('Found Product:', foundProduct)
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
      console.log('Is Conflicting Name:', isConflicting)
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
      const foundProduct = await productsRepository.findById(insertedProduct.id)
      console.log('Found Product after Delete:', foundProduct)
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
      console.log('Found Product by Name:', foundProduct)
    })
  })
})
