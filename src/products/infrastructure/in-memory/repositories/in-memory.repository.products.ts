import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { InMemoryRepository } from '@/common/domain/repositories/in-memory.repository'
import { ProductModel } from '@/products/domain/models/products.model'
import {
  ProductsId,
  ProductsRepository,
} from '@/products/repositories/product.repository'

export class InMemoryProductsRepository
  extends InMemoryRepository<ProductModel>
  implements ProductsRepository
{
  protected applyFilter(
    items: ProductModel[],
    filter: string | null,
  ): Promise<ProductModel[]> {
    if (!filter) {
      return Promise.resolve(items)
    }
    return Promise.resolve(
      items.filter(item => {
        return item.name.toLowerCase().includes(filter.toLowerCase())
      }),
    )
  }

  protected async applySort(
    items: ProductModel[],
    sort: string | null,
    sort_dir: string | null,
  ): Promise<ProductModel[]> {
    return super.applySort(items, sort ?? 'created_at', sort_dir ?? 'desc')
  }
  sortableFields = ['name', 'created_at', 'updated_at']
  findByName(name: string): Promise<ProductModel | null> {
    const model = this.items.find(item => item.name === name)
    if (!model) {
      throw new NotFoundError(`Product with name ${name} not found`)
    }
    return Promise.resolve(model)
  }
  findAllById(productsIds: ProductsId[]): Promise<ProductModel[]> {
    const existingProducts = []
    for (const productId of productsIds) {
      const product = this.items.find(item => item.id === productId.id)
      if (!product) {
        throw new NotFoundError(`Product with id ${productId.id} not found`)
      }
      existingProducts.push(product)
    }
    return Promise.resolve(existingProducts)
  }
  conflictingName(name: string): Promise<boolean> {
    const model = this.items.find(item => item.name === name)
    if (model) {
      throw new NotFoundError(`Product with name ${name} already exists`)
    }
    return Promise.resolve(false)
  }
}
