import { BadRequestError } from '@/common/domain/errors/bad-request-error'
import { ProductsRepository } from '@/products/domain/models/products.model'
import { ProductsTypeormRepository } from '@/products/infrastructure/typeorm/repositories/products-typeorm.repository'

export namespace CreateProductUseCase {
  export type input = {
    name: string
    price: number
    quantity: number
  }

  export type output = {
    id: string
    name: string
    price: number
    quantity: number
    created_at: Date
    updated_at: Date
  }

  export class ProductUseCase {
    constructor(
      private readonly productsRepository: ProductsRepository = new ProductsTypeormRepository(),
    ) {}
    async execute(input: input): Promise<output> {
      if (!input.name || !input.price || !input.quantity) {
        throw new BadRequestError('Name, price and quantity are required')
      }
      const product = await this.productsRepository.insert(input as any)
      return product
    }
  }
}
