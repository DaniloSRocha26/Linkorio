# Product Inventory System - Planejamento do Projeto

## Contexto
Projeto de aprendizado do zero. Danilo está aprendendo React, Node.js/Express e PostgreSQL construindo um sistema de gerenciamento de estoque de produtos.

**Importante para o Claude:** Não entregue código pronto. Guie o Danilo, explique o porquê de cada decisão, e deixe ele escrever o código. Corrija quando errar. Ele aprende melhor assim.

---

## Stack
- **Frontend:** React (Tailwind CSS será adicionado futuramente)
- **Backend:** Node.js + Express
- **Banco de dados:** PostgreSQL
- **Estrutura:** Monorepo com `/front-end` e `/back-end`

---

## Arquitetura

```
[React Frontend]  <-->  [Express API]  <-->  [PostgreSQL]
    :5173               :3000                :5432
```

### Camadas do Backend
```
routes      -> define as URLs da API
controllers -> recebe a requisição e devolve a resposta
services    -> lógica de negócio e queries SQL
config      -> conexão com o banco
```

---

## Estrutura de Pastas

```
Products/
├── front-end/
├── back-end/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js           (conexão com o PostgreSQL - FEITO)
│   │   ├── controllers/
│   │   │   └── categoriaController.js   (a fazer)
│   │   ├── routes/
│   │   │   └── categoriaRoutes.js       (a fazer)
│   │   └── services/
│   │       └── categoriaService.js      (FEITO - getAll())
│   ├── index.js                (servidor Express - FEITO)
│   ├── .env                    (variáveis de ambiente - FEITO)
│   └── package.json
├── database/
│   └── schema.sql              (FEITO)
└── .gitignore
```

---

## Banco de Dados

### Tabelas criadas no PostgreSQL (banco: `inventory`)

```sql
CREATE TABLE categorias(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE fornecedores(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    contato VARCHAR(255)
);

CREATE TABLE produtos(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(10,2),
    quantidade INT,
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id),
    fornecedor_id INT,
    FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id)
);

CREATE TABLE movimentacoes(
    id SERIAL PRIMARY KEY,
    produto_id INT,
    FOREIGN KEY (produto_id) REFERENCES produtos(id),
    tipo VARCHAR(10) CHECK(tipo IN ('entrada', 'saida')),
    quantidade INT,
    data TIMESTAMP
);
```

---

## Variáveis de Ambiente (.env)

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=inventory
```

---

## Dependências do Backend

```json
{
  "dependencies": {
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "pg": "^8.20.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
```

Scripts:
- `npm run dev` -> inicia o servidor com nodemon (desenvolvimento)
- `npm start` -> inicia o servidor com node (produção)

---

## O que já foi feito

- [x] Estrutura de pastas do projeto
- [x] `.gitignore` na raiz
- [x] Banco de dados `inventory` criado no PostgreSQL
- [x] 4 tabelas criadas: `categorias`, `fornecedores`, `produtos`, `movimentacoes`
- [x] `schema.sql` com todas as tabelas versionado no repositório
- [x] Backend inicializado com `npm init`
- [x] Dependências instaladas (express, pg, dotenv, cors, nodemon)
- [x] `index.js` com servidor Express funcionando na porta 3000
- [x] `src/config/db.js` com conexão ao PostgreSQL via Pool
- [x] `src/services/categoriaService.js` com função `getAll()`
- [x] Repositório GitHub: https://github.com/DaniloSRocha26/Product-inventory-system

---

## Próximos passos (continuar a partir daqui)

### 1. Finalizar o CRUD de Categorias (Backend)

Seguir sempre o fluxo: **service -> controller -> routes -> registrar no index.js**

#### `src/controllers/categoriaController.js`
- Importar as funções do `categoriaService.js`
- Criar função `getAllCategorias(req, res)` que chama `getAll()` e retorna `res.json()`
- Exportar a função

#### `src/routes/categoriaRoutes.js`
- Importar o `express` e criar um `Router`
- Importar as funções do controller
- Definir as rotas:
  - `GET /` -> getAllCategorias
  - `POST /` -> createCategoria
  - `PUT /:id` -> updateCategoria
  - `DELETE /:id` -> deleteCategoria
- Exportar o router

#### Registrar as rotas no `index.js`
- Importar o `categoriaRoutes.js`
- Usar `app.use('/categorias', categoriaRoutes)`

#### Completar o `categoriaService.js` com todas as funções
- `getAll()` -> FEITA
- `create(nome)` -> INSERT INTO categorias
- `update(id, nome)` -> UPDATE categorias
- `remove(id)` -> DELETE FROM categorias

### 2. CRUD de Fornecedores (mesmo padrão de Categorias)

### 3. CRUD de Produtos (mais complexo, tem relacionamentos)

### 4. CRUD de Movimentações (entrada/saída de estoque)

### 5. Frontend com React
- Criar com `npm create vite@latest front-end -- --template react`
- Instalar axios para fazer as requisições HTTP à API
- Criar as telas: Produtos, Categorias, Fornecedores, Movimentações

### 6. Tailwind CSS
- Adicionar ao frontend após as telas estarem funcionando

---

## Preferências e combinados
- Commits em inglês
- Commit e push após cada arquivo/feature concluída
- Comentários nos arquivos em português, na primeira pessoa, simples e detalhados (sem travessões)
- Claude não entrega código pronto, apenas guia
- Padrão de commit: `feat: descrição` para novas features
