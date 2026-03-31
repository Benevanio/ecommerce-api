import { beforeEach, describe, expect, it } from '@jest/globals'

import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { ProductModel } from '@/products/domain/models/products.model'
import { ProdductsDataBuilder } from '@/products/infrastructure/test/helper/products-data-builder'

import { InMemoryProductsRepository } from './in-memory.repository.products'

describe('InMemoryProductsRepository unit tests', () => {
  let sut: InMemoryProductsRepository

  const makeProduct = (props?: Partial<ProductModel>): ProductModel => {
    return ProdductsDataBuilder(props).build()
  }

  beforeEach(() => {
    sut = new InMemoryProductsRepository()
  })

  describe('create', () => {
    it('should create a new product with generated metadata', () => {
      const result = sut.create({
        name: 'Keyboard',
        price: 100,
        quantity: 5,
      } as ProductModel)

      expect(result).toEqual(
        expect.objectContaining({
          name: 'Keyboard',
          price: 100,
          quantity: 5,
        }),
      )
      expect(result.id).toEqual(expect.any(String))
      expect(result.created_at).toBeInstanceOf(Date)
      expect(result.updated_at).toBeInstanceOf(Date)
    })
  })

  describe('findById', () => {
    it('should throw NotFoundError when product does not exist', async () => {
      await expect(sut.findById('missing-id')).rejects.toThrow(
        new NotFoundError('Model not found using ID missing-id'),
      )
    })

    it('should return the stored product', async () => {
      const product = makeProduct()
      await sut.insert(product)

      const result = await sut.findById(product.id)

      expect(result).toStrictEqual(product)
    })
  })

  describe('update', () => {
    it('should replace the stored product preserving its position', async () => {
      const createdAt = new Date('2026-01-01T00:00:00.000Z')
      const product = makeProduct({
        id: 'product-id',
        name: 'Old name',
        created_at: createdAt,
        updated_at: createdAt,
      })
      await sut.insert(product)

      const updatedProduct = {
        ...product,
        name: 'New name',
        price: 250,
        quantity: 9,
        updated_at: new Date('2026-01-02T00:00:00.000Z'),
      }

      const result = await sut.update(updatedProduct)

      expect(result).toStrictEqual(updatedProduct)
      expect(sut.items).toStrictEqual([updatedProduct])
    })

    it('should throw NotFoundError when updating an unknown product', async () => {
      await expect(
        sut.update(makeProduct({ id: 'missing-id' })),
      ).rejects.toThrow(
        new NotFoundError('Model not found using ID missing-id'),
      )
    })
  })

  describe('delete', () => {
    it('should remove the product from the repository', async () => {
      const firstProduct = makeProduct({ id: 'first-id' })
      const secondProduct = makeProduct({ id: 'second-id' })
      await sut.insert(firstProduct)
      await sut.insert(secondProduct)

      await sut.delete(firstProduct.id)

      expect(sut.items).toStrictEqual([secondProduct])
    })

    it('should throw NotFoundError when deleting an unknown product', async () => {
      await expect(sut.delete('missing-id')).rejects.toThrow(
        new NotFoundError('Model not found using ID missing-id'),
      )
    })
  })

  describe('findByName', () => {
    it('should return a product with the exact given name', async () => {
      const keyboard = makeProduct({ name: 'Keyboard' })
      const mouse = makeProduct({ name: 'Mouse' })
      await sut.insert(keyboard)
      await sut.insert(mouse)

      const result = await sut.findByName('Keyboard')

      expect(result).toStrictEqual(keyboard)
    })

    it('should throw NotFoundError when no product matches the name', async () => {
      expect(() => sut.findByName('Keyboard')).toThrow(
        new NotFoundError('Product with name Keyboard not found'),
      )
    })
  })

  describe('findAllById', () => {
    it('should return products in the same order as requested ids', async () => {
      const firstProduct = makeProduct({ id: 'first-id', name: 'Keyboard' })
      const secondProduct = makeProduct({ id: 'second-id', name: 'Mouse' })
      await sut.insert(firstProduct)
      await sut.insert(secondProduct)

      const result = await sut.findAllById([
        { id: secondProduct.id },
        { id: firstProduct.id },
      ])

      expect(result).toStrictEqual([secondProduct, firstProduct])
    })

    it('should throw NotFoundError when any requested id does not exist', async () => {
      await sut.insert(makeProduct({ id: 'existing-id' }))

      expect(() =>
        sut.findAllById([{ id: 'existing-id' }, { id: 'missing-id' }]),
      ).toThrow(new NotFoundError('Product with id missing-id not found'))
    })
  })

  describe('conflictingName', () => {
    it('should return false when the product name is available', async () => {
      await sut.insert(makeProduct({ name: 'Keyboard' }))

      const result = await sut.conflictingName('Mouse')

      expect(result).toBe(false)
    })

    it('should throw NotFoundError when the product name already exists', async () => {
      await sut.insert(makeProduct({ name: 'Keyboard' }))

      expect(() => sut.conflictingName('Keyboard')).toThrow(
        new NotFoundError('Product with name Keyboard already exists'),
      )
    })
  })

  describe('search', () => {
    it('should apply default sort by created_at desc and default pagination', async () => {
      const oldestProduct = makeProduct({
        name: 'Old',
        created_at: new Date('2026-01-01T00:00:00.000Z'),
      })
      const newestProduct = makeProduct({
        name: 'New',
        created_at: new Date('2026-01-03T00:00:00.000Z'),
      })
      const middleProduct = makeProduct({
        name: 'Mid',
        created_at: new Date('2026-01-02T00:00:00.000Z'),
      })
      sut.items = [oldestProduct, newestProduct, middleProduct]

      const result = await sut.search({})

      expect(result).toStrictEqual({
        items: [newestProduct, middleProduct, oldestProduct],
        total: 3,
        current_page: 1,
        per_page: 15,
        sort: null,
        sort_dir: null,
        filter: null,
      })
    })

    it('should combine filtering, explicit sorting and pagination', async () => {
      const items = [
        makeProduct({
          id: '1',
          name: 'Gamma keyboard',
          created_at: new Date('2026-01-01T00:00:00.000Z'),
        }),
        makeProduct({
          id: '2',
          name: 'Alpha monitor',
          created_at: new Date('2026-01-02T00:00:00.000Z'),
        }),
        makeProduct({
          id: '3',
          name: 'Beta keyboard',
          created_at: new Date('2026-01-03T00:00:00.000Z'),
        }),
        makeProduct({
          id: '4',
          name: 'Delta keyboard',
          created_at: new Date('2026-01-04T00:00:00.000Z'),
        }),
      ]
      sut.items = items

      const result = await sut.search({
        filter: 'keyboard',
        sort: 'name',
        sort_dir: 'asc',
        page: 2,
        per_page: 2,
      })

      expect(result).toStrictEqual({
        items: [items[0]],
        total: 3,
        current_page: 2,
        per_page: 2,
        sort: 'name',
        sort_dir: 'asc',
        filter: 'keyboard',
      })
    })
  })
})
