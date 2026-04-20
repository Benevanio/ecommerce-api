import swaggerJsdoc from 'swagger-jsdoc'

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API para gerenciamento de vendas',
    },
    servers: [
      {
        url: 'http://localhost:3333',
      },
    ],
  },
  apis: ['src/**/*.ts'],
})
