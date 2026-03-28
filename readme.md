# Ecommerce API

Projeto de estudos em Node.js com TypeScript, construído como parte de uma aula do curso de Arquitetura Limpa e também como material de aprimoramento pessoal durante a minha pós-graduação.

Este repositório representa meu processo de evolução técnica em back-end, organização de camadas, regras de negócio e boas práticas de arquitetura de software.

## Contexto

Este projeto foi utilizado como base de estudo para:

- praticar os princípios de Clean Architecture
- reforçar separação entre domínio, aplicação e infraestrutura
- exercitar injeção de dependência, validação, autenticação e persistência
- consolidar conhecimento técnico em paralelo à graduação lato sensu (pós-graduação)

Mais do que um projeto pronto, este repositório funciona como laboratório de aprendizado e evolução contínua.

## Objetivos de Aprendizado

- estruturar uma API REST com foco em organização e manutenção
- aplicar TypeScript de forma consistente no back-end
- trabalhar com TypeORM e modelagem de dados
- praticar autenticação com JWT
- documentar e testar fluxos importantes da aplicação
- estudar padrões úteis para projetos reais em Node.js

## Stack Utilizada

- Node.js
- TypeScript
- Express
- TypeORM
- PostgreSQL
- Zod
- JWT
- TSyringe
- Jest
- Swagger

## Estrutura do Projeto

O projeto foi organizado com foco em responsabilidade por camada.

- `src/common/domain`: contratos, erros e abstrações centrais
- `src/common/infrastructure`: configurações, providers, HTTP e integração com banco
- `docs`: anotações e materiais auxiliares sobre os temas estudados

## Conteúdos Estudados

Os arquivos da pasta `docs` registram parte do material estudado durante a evolução do projeto.

- class-transformer
- dependency injection
- integração com testes
- JWT
- gerenciamento de perfil e senha
- TypeORM
- upload de arquivos
- use cases
- Swagger

## Requisitos

Para trabalhar neste projeto, tenha instalado:

- Node.js 20+ 
- npm
- Docker
- PostgreSQL via container ou ambiente local

## Configuração do Ambiente

1. Instale as dependências:

```bash
npm ci
```

2. Crie o arquivo `.env` a partir de `.env.example`.

3. Ajuste as variáveis de ambiente conforme seu banco e sua necessidade local.

Exemplo base:

```env
PORT=3333
NODE_ENV=development
API_URL=http://localhost:3333

DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_SCHEMA=public
DB_NAME=postgres
DB_USER=postgres
DB_PASS=postgres

JWT_SECRET=my_secret
JWT_EXPIRES_IN=86400
```

## Scripts

- `npm run dev`: inicia a aplicação em modo desenvolvimento
- `npm run lint`: executa a análise estática
- `npm test`: executa os testes unitários
- `npm run test:int`: executa os testes de integração

## Observações

- Este é um repositório de estudo e aprimoramento técnico.
- A implementação pode evoluir conforme novas aulas, refatorações e experimentos arquiteturais.
- Parte do valor deste projeto está justamente no processo de aprendizado, e não apenas no resultado final.

## Sobre Mim

Este projeto faz parte da minha jornada de aprofundamento em desenvolvimento back-end, arquitetura limpa e engenharia de software, alinhando prática de mercado com o que venho estudando durante minha pós-graduação.
