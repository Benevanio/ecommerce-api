import { AppError } from '@/common/domain/errors/app-error'
import * as dotenv from 'dotenv'
import { existsSync } from 'node:fs'
import * as path from 'node:path'
import { z } from 'zod'

const rootDir = path.resolve(__dirname, '../../../../')
const defaultEnvPath = path.join(rootDir, '.env')
const testEnvPath = path.join(rootDir, '.env.test')

if (existsSync(defaultEnvPath)) {
  dotenv.config({ path: defaultEnvPath })
}

if (process.env.NODE_ENV === 'test' && existsSync(testEnvPath)) {
  dotenv.config({ path: testEnvPath, override: true })
}

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3333),
  API_URL: z.string().default('http://localhost:3333'),
  DB_TYPE: z.literal('postgres').default('postgres'),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().default(5432),
  DB_SCHEMA: z.string().default('public'),
  DB_NAME: z.string().default('postgres'),
  DB_USER: z.string().default('postgres'),
  DB_PASS: z.string().default('postgres'),
  JWT_SECRET: z.string().default('test-secret'),
  JWT_EXPIRES_IN: z.coerce.number().default(86400),
  CLOUDFLARE_ACCOUNT_ID: z.string().default(''),
  CLOUDFLARE_R2_URL: z.string().default(''),
  BUCKET_NAME: z.string().default(''),
  AWS_ACCESS_KEY_ID: z.string().default(''),
  AWS_SECRET_ACCESS_KEY: z.string().default(''),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  throw new AppError('Invalid environment variables')
}

export const env = _env.data
