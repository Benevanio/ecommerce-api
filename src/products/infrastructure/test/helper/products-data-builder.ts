import { ProductModel } from '@/products/domain/models/products.model'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'

export function ProdductsDataBuilder(props?: Partial<ProductModel>) {
  const build = (): ProductModel => {
    return {
      id: props?.id ?? randomUUID(),
      name: props?.name ?? faker.commerce.productName(),
      price: props?.price ?? faker.number.float({ min: 1, max: 1000 }),
      quantity: props?.quantity ?? faker.number.int({ min: 1, max: 100 }),
      created_at: props?.created_at ?? new Date(),
      updated_at: props?.updated_at ?? new Date(),
    }
  }

  return {
    build,
  }
}
