import { ProductsTypeormRepository } from '@/products/infrastructure/typeorm/repositories/products-typeorm.repository'

export namespace ListProductsUseCase {
  export class Usecase {
    constructor(
      private readonly productsRepository = new ProductsTypeormRepository(),
    ) {}

    async execute() {
      return this.productsRepository.findAll()
    }
  }
}
