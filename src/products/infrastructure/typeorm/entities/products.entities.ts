import { ProductModel } from '@/products/domain/models/products.model'

export class ProductEntity implements ProductModel {
  id: string
  name: string
  price: number
  quantity: number
  created_at: Date
  updated_at: Date
}
