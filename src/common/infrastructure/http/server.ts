/* eslint-disable prettier/prettier */
import { dataSource } from '@/common/typeorm/typeorm'
import { app } from './app'
import { env } from './env'

dataSource.initialize()
  .then(() => {
    console.log('Database connected successfully')   

app.listen(env.PORT, () => {
  console.log(`Servidor rodando na porta ${env.PORT}`)
})
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error)
  })

