## Configurando o TypeORM

O [TypeORM](https://typeorm.io/) é a ferramenta que utilizaremos para criação do mapeamento da estrutura do banco de dados da API com classes que descrevem as entidades.

Uma ferramenta ORM nos permite relacionar registros das tabelas em banco de dados com uma instância de uma classe typescript, um objeto.

Na prática, criaremos Entidades com a representação dos dados de uma tabela e Repositórios para que possamos manipular os dados do banco de dados: inserir, alterar, remover, etc. Tudo isso através do TypeORM.

A Entidade define a estrutura dos dados. Para realizar as operações de manipulação dos dados, usamos o padrão Repository, que o TypeORM já implementa os principais métodos, como por exemplo, `create`, `save`, `find`, `findOne`, `remove`, etc.

Outra vantagem em usar o TypeORM é a CLI que estará disponível para automatizar diversas tarefas como por exemplo, criação de migrações.

No nosso projeto utilizaremos o banco de dados Postgres rodando em container Docker.

Instalação do TypeORM e Postgres no projeto:

```shell
npm install typeorm pg
```

O TypeORM disponibiliza uma ferramenta CLI que nos permite criar os arquivos de migrations para definição da estrutura do banco de dados, além de vários outros recursos.

Para rodar a CLI em Typescript, usaremos o executável `typeorm-ts-node-commonjs` apontando para o arquivo de DataSource (`-d`).

Vamos configurar um script no arquivo `package.json`, que será usado para rodar a CLI do TypeORM:

```json
"scripts": {
	"typeorm": "npx dotenv-cli -e .env -- typeorm-ts-node-commonjs -d ./src/common/typeorm/typeorm.ts",
	"migration:run": "npm run typeorm -- migration:run",
	"migration:revert": "npm run typeorm -- migration:revert",
	"migration:show": "npm run typeorm -- migration:show"
}
```

Para verificar o funcionamento desse script, execute:

```shell
npm run migration:show
```

Se você quiser passar comandos diretamente para a CLI, lembre-se: o `-d` deve sempre apontar para o arquivo de DataSource, e não para um arquivo de migration.
