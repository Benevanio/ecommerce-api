import { CreateProductUseCase } from '@/products/application/usecase/create-product.usecase'
import { ListProductsUseCase } from '@/products/application/usecase/list-product.usecase'
import { ProductsTypeormRepository } from '@/products/infrastructure/typeorm/repositories/products-typeorm.repository'
import { container } from 'tsyringe'
container.registerSingleton('ProductsRepository', ProductsTypeormRepository)
container.registerSingleton(
  'CreateProductUseCase',
  CreateProductUseCase.Usecase,
)
container.registerSingleton('ListProductsUseCase', ListProductsUseCase.Usecase)
