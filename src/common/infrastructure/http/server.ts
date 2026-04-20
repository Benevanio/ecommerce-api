/* eslint-disable prettier/prettier */
import '@/common/infrastructure/container'
import { dataSource } from '@/common/typeorm/typeorm'
import { app } from './app'
import { env } from './env'

dataSource.initialize().then(() => {
   
  app.listen(env.PORT, () => {
    console.log(`Servidor rodando na porta ${env.PORT}`)
  })
  console.log('entities path:', [__dirname + '/../**/entities/*.{js,ts}'])
})
  .catch((error) => {
    console.error('Error connecting to the database:', error)
  })

  app.on('error', (error) => {
    console.error('Error starting the server:', error)
  })


