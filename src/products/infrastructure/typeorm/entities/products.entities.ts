import { ProductModel } from '@/products/domain/models/products.model'
import { Column, PrimaryGeneratedColumn } from 'typeorm'

export class ProductEntity implements ProductModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  name: string

  @Column('decimal')
  price: number

  @Column('int')
  quantity: number

  @Column('timestamp')
  created_at: Date

  @Column('timestamp')
  updated_at: Date
}
