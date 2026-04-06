/* eslint-disable prettier/prettier */
import * as dotenv from 'dotenv'
import { existsSync } from 'node:fs'
import * as path from 'node:path'
import { z } from 'zod'

const rootDir = path.resolve(__dirname, '../../../../../')
const defaultEnvPath = path.join(rootDir, '.env')
const testEnvPath = path.join(rootDir, '.env.test')

if (existsSync(defaultEnvPath)) {
  dotenv.config({ path: defaultEnvPath })
}

if (process.env.NODE_ENV === 'test' && existsSync(testEnvPath)) {
  dotenv.config({ path: testEnvPath, override: true })
}

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z
    .enum(['development', 'hml', 'production', 'test'])
    .default('development'),
  API_URL: z.string().default('http://localhost:3333'),
  DB_TYPE: z.string().default('sqlite'),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().default(5432),
  DB_SCHEMA: z.string().default('public'),
  DB_NAME: z.string().default('postgres'),
  DB_USER: z.string().default('postgres'),
  DB_PASS: z.string().default('postgres'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables:', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const env = _env.data
