export interface ProductModel {
  id: string
  name: string
  price: number
  quantity: number
  created_at?: Date
  updated_at?: Date
}

export interface ProductsRepository {
  insert(product: ProductModel): Promise<ProductModel>
  findById(id: string): Promise<ProductModel>
  update(product: ProductModel): Promise<ProductModel>
  delete(id: string): Promise<void>
  conflictingName(name: string, id?: string): Promise<boolean>
}
