import {
  ProductModel,
  ProductsRepository,
} from '@/products/domain/models/products.model'

export class ProductsTypeormRepository implements ProductsRepository {
  async insert(product: ProductModel): Promise<ProductModel> {
    if (!product.id) {
      product.id = crypto.randomUUID()
    }
    const now = new Date()
    if (!product.created_at) {
      product.created_at = now
    }
    product.updated_at = now

    return product
  }
  async findById(id: string): Promise<ProductModel> {
    if (!id) {
      throw new Error('ID is required')
    } else {
      throw new Error('Product not found')
    }
  }
  async update(product: ProductModel): Promise<ProductModel> {
    if (!product.id) {
      throw new Error('ID is required for update')
    }
    product.updated_at = new Date()
    return product
  }
  async conflictingName(name: string, id?: string): Promise<boolean> {
    if (!name) {
      throw new Error('Name is required')
    }
    return false
  }
}
