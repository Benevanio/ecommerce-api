import { ProductEntity } from '@/products/infrastructure/typeorm/entities/products.entities'
import { DataSource } from 'typeorm'
import { env } from '../infrastructure/http/env'

export const dataSource = new DataSource({
  type: 'postgres' as const,
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  schema: env.DB_SCHEMA,
  synchronize: true,
  logging: false,
  entities: [ProductEntity],
  migrations: ['**/migrations/**/*.ts'],
  subscribers: ['**/subscribers/**/*.ts'],
})
