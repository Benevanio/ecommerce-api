import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['development', 'hml', 'production']).default('development'),
  API_URL: z.string().default('http://localhost:3333'),
})

const env = envSchema.parse(process.env)

if (env.NODE_ENV === 'production') {
  throw new Error('O ambiente de produção não está configurado')
} else if (env.NODE_ENV === 'hml') {
  throw new Error('O ambiente de homologação não está configurado')
} else {
  throw new Error('O ambiente de desenvolvimento não está configurado')
}
export { env }
