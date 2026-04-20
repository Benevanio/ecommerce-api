import { BadRequestError } from '@/common/domain/errors/bad-request-error'
import { ProductsRepository } from '@/products/domain/models/products.model'
import { inject, injectable } from 'tsyringe'
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
  @injectable()
  export class Usecase {
    constructor(
      @inject('ProductsRepository')
      private readonly productsRepository: ProductsRepository,
    ) {}
    async execute(input: input): Promise<output> {
      if (!input.name || !input.price || !input.quantity) {
        throw new BadRequestError('Name, price and quantity are required')
      }
      await this.productsRepository
        .conflictingName(input.name)
        .then(conflict => {
          if (conflict) {
            throw new BadRequestError('Product name already exists')
          }
        })
      const product = await this.productsRepository.insert({
        name: input.name,
        price: input.price,
        quantity: input.quantity,
        id: input.name.toLowerCase().replace(/\s/g, '-') + '-' + Date.now(),
        created_at: undefined,
        updated_at: undefined,
      })
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        created_at: product.created_at,
        updated_at: product.updated_at,
      }
    }
  }
}
