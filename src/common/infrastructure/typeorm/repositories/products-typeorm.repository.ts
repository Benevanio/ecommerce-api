import { NotFoundError } from '@/common/domain/errors/not-found-error'
import {
  SearchInput,
  SearchOutput,
} from '@/common/domain/repositories/repository.interface'
import { dataSource } from '@/common/typeorm/typeorm'
import { ProductModel } from '@/products/domain/models/products.model'
import { ProductEntity } from '@/products/infrastructure/typeorm/entities/products.entities'
import {
  CreateProductProps,
  ProductsId,
  ProductsRepository,
} from '@/products/repositories/product.repository'
import { Repository } from 'typeorm'
export class ProductsTypeormRepository implements ProductsRepository {
  sortableFields: string[] = ['name', 'created_at']
  productsRepository: Repository<ProductModel>

  constructor() {
    this.productsRepository = dataSource.getRepository(ProductEntity)
  }
  findAllById(productsIds: ProductsId[]): Promise<ProductModel[]> {
    const query = this.productsRepository
      .createQueryBuilder('product')
      .where('product.id IN (:...ids)', { ids: productsIds })
    return query.getMany()
  }

  findByName(name: string): Promise<ProductModel> {
    throw new Error('Method not implemented.')
  }

  findAllByIds(productIds: ProductsId[]): Promise<ProductModel[]> {
    const query = this.productsRepository
      .createQueryBuilder('product')
      .where('product.id IN (:...ids)', { ids: productIds })
    return query.getMany()
  }

  async conflictingName(name: string): Promise<boolean> {
    const query = this.productsRepository
      .createQueryBuilder('product')
      .where('product.name = :name', { name })
    const count = await query.getCount()
    return count > 0
  }

  create(props: CreateProductProps): ProductModel {
    return this.productsRepository.create(props)
  }

  async insert(model: ProductModel): Promise<ProductModel> {
    return this.productsRepository.save(model)
  }

  async findById(id: string): Promise<ProductModel> {
    return this._get(id)
  }

  update(model: ProductModel): Promise<ProductModel> {
    const entity = this.productsRepository
      .update(model.id, model)
      .then(() => model)
      .catch(error => {
        if (error instanceof NotFoundError) {
          throw new NotFoundError(`Product not found using ID ${model.id}`)
        }
        throw error
      })
    return entity
  }

  delete(id: string): Promise<void> {
    return this.productsRepository.delete(id).then(() => undefined)
  }

  search(props: SearchInput): Promise<SearchOutput<ProductModel>> {
    const query = this.productsRepository.createQueryBuilder('product')

    if (props.filter) {
      query.where('product.name ILIKE :filter', { filter: `%${props.filter}%` })
    }

    if (props.sort && this.sortableFields.includes(props.sort)) {
      const sortDir = props.sort_dir === 'desc' ? 'DESC' : 'ASC'
      query.orderBy(`product.${props.sort}`, sortDir)
    }

    const page = props.page || 1
    const perPage = props.per_page || 10
    query.skip((page - 1) * perPage).take(perPage)

    return query.getManyAndCount().then(([items, total]) => ({
      items,
      total,
      current_page: page,
      per_page: perPage,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter,
    }))
  }

  protected async _get(id: string): Promise<ProductModel> {
    const product = await this.productsRepository.findOneBy({ id })
    if (!product) {
      throw new NotFoundError(`Product not found using ID ${id}`)
    }
    return product
  }
}
