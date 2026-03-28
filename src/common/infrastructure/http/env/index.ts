import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['development', 'hml', 'production']).default('development'),
  API_URL: z.string().default('http://localhost:3333'),
})

const env = envSchema.parse(process.env)

export { env }
