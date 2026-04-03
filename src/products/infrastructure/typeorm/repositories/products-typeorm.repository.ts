import { dataSource } from '@/common/typeorm/typeorm'
import {
    ProductModel,
    ProductsRepository,
} from '@/products/domain/models/products.model'
import { Repository } from 'typeorm'
import { ProductEntity } from '../entities/products.entities'

export class ProductsTypeormRepository implements ProductsRepository {
  sortableFields = ['name', 'price', 'quantity', 'created_at', 'updated_at']
  productsRepository: Repository<ProductEntity>

  constructor() {
    this.productsRepository = dataSource.getRepository(ProductEntity)
  }
  async insert(product: ProductModel): Promise<ProductModel> {
    const entity = this.productsRepository.create(product)
    const savedEntity = await this.productsRepository.save(entity)
    return savedEntity
  }
  async findById(id: string): Promise<ProductModel> {
    const product = await this._get(id)
    return product
  }
  async update(product: ProductModel): Promise<ProductModel> {
    if (!product.id) {
      throw new Error('ID is required for update')
    }
    product.updated_at = new Date()
    const entity = this.productsRepository.create(product)
    const savedEntity = await this.productsRepository.save(entity)
    return savedEntity
  }

  async delete(id: string): Promise<void> {
    const product = await this._get(id)
    await this.productsRepository.remove(product)
  }

  async conflictingName(name: string, id?: string): Promise<boolean> {
    const query = this.productsRepository
      .createQueryBuilder('product')
      .where('product.name = :name', { name })
    if (id) {
      query.andWhere('product.id != :id', { id })
    }
    const count = await query.getCount()
    return count > 0
  }
  protected async _get(id: string): Promise<ProductEntity> {
    const product = await this.productsRepository.findOneBy({ id })
    if (!product) {
      throw new Error(`Product with ID ${id} not found`)
    }
    return product
  }
}
