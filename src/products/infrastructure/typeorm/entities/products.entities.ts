import { ProductModel } from '@/products/domain/models/products.model'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('products')
export class ProductEntity implements ProductModel {
  @PrimaryColumn()
  id: string

  @Column('varchar')
  name: string

  @Column('decimal')
  price: number

  @Column('int')
  quantity: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
