# Wishlist App - Planejamento do Projeto

## Contexto
Projeto de aprendizado do zero. Danilo está aprendendo React, Node.js/Express e PostgreSQL construindo uma lista de desejos (wishlist) onde usuários podem salvar produtos que querem comprar, com links de onde comprar e marcar como comprado quando adquirirem.

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

## Funcionalidades
- Cadastro e login de usuários
- Cada usuário cria e gerencia suas próprias categorias
- Cada usuário adiciona produtos à sua wishlist com nome, descrição e links de compra
- Um produto pode ter vários links (de lojas diferentes)
- O usuário pode marcar um produto como comprado
- Imagem do produto (será implementada no final)

---

## Banco de Dados

### Novo schema (banco: `inventory`)

```sql
CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE usuarios(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    email CITEXT NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE categorias(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id),
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE produtos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id),
    categoria_id UUID REFERENCES categorias(id),
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    comprado BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE links(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    produto_id UUID NOT NULL REFERENCES produtos(id),
    url TEXT NOT NULL,
    nome_loja VARCHAR(255)
);
```

### Atenção
As tabelas antigas (`fornecedores`, `movimentacoes`) foram removidas do escopo.
O schema foi atualizado para o novo modelo e as tabelas foram recriadas no pgAdmin.

---

## Estrutura de Pastas

```
Products/
├── front-end/
├── back-end/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                    (FEITO)
│   │   ├── controllers/
│   │   │   ├── categoriaController.js   (FEITO - só getAll por enquanto)
│   │   │   ├── usuarioController.js     (a fazer)
│   │   │   ├── produtoController.js     (a fazer)
│   │   │   └── linkController.js        (a fazer)
│   │   ├── routes/
│   │   │   ├── categoriaRoutes.js       (FEITO - só GET por enquanto)
│   │   │   ├── usuarioRoutes.js         (a fazer)
│   │   │   ├── produtoRoutes.js         (a fazer)
│   │   │   └── linkRoutes.js            (a fazer)
│   │   └── services/
│   │       ├── categoriaService.js      (FEITO - só getAll())
│   │       ├── usuarioService.js        (a fazer)
│   │       ├── produtoService.js        (a fazer)
│   │       └── linkService.js           (a fazer)
│   ├── index.js                         (FEITO)
│   ├── .env                             (FEITO)
│   └── package.json
├── database/
│   └── schema.sql                       (FEITO)
└── .gitignore
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

Futuramente adicionar:
```
JWT_SECRET=uma_chave_secreta_qualquer
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

Futuramente instalar:
- `bcrypt` -> para criptografar senhas
- `jsonwebtoken` -> para autenticação com JWT

Scripts:
- `npm run dev` -> inicia o servidor com nodemon (desenvolvimento)
- `npm start` -> inicia o servidor com node (produção)

---

## O que já foi feito

- [x] Estrutura de pastas do projeto
- [x] `.gitignore` na raiz
- [x] Banco de dados `inventory` criado no PostgreSQL
- [x] `src/config/db.js` com conexão ao PostgreSQL via Pool
- [x] `index.js` com servidor Express funcionando na porta 3000
- [x] `src/services/categoriaService.js` com função `getAll()`
- [x] `src/controllers/categoriaController.js` com `getAllCategorias()`
- [x] `src/routes/categoriaRoutes.js` com rota GET /categorias
- [x] Rota GET /categorias testada e funcionando
- [x] Repositório GitHub: https://github.com/DaniloSRocha26/Product-inventory-system
- [x] Banco de dados atualizado com novo schema (usuarios, categorias, produtos, links)
- [x] `database/schema.sql` atualizado com o novo schema

---

## Próximos passos (continuar a partir daqui)

### ~~1. Atualizar o banco de dados~~ (FEITO)
- ~~Deletar as tabelas antigas no pgAdmin (na ordem: movimentacoes, produtos, fornecedores, categorias)~~
- ~~Criar as novas tabelas na ordem: usuarios, categorias, produtos, links~~
- ~~Atualizar o `database/schema.sql` com o novo schema~~

### 2. Autenticação de usuários
- Instalar `bcrypt` e `jsonwebtoken`
- Adicionar `JWT_SECRET` no `.env`
- Criar `usuarioService.js` com funções: `register(nome, email, senha)` e `login(email, senha)`
- Criar `usuarioController.js` com funções: `register` e `login`
- Criar `usuarioRoutes.js` com rotas: `POST /usuarios/register` e `POST /usuarios/login`
- O login deve retornar um token JWT que será usado nas próximas requisições

### 3. Middleware de autenticação
- Criar `src/middlewares/auth.js` que valida o token JWT em rotas protegidas
- Rotas de categorias, produtos e links serão protegidas por esse middleware

### 4. CRUD de Categorias (adaptar o que já existe)
- Atualizar `categoriaService.js`: o `getAll` precisa filtrar por `usuario_id`
- Completar com: `create(usuario_id, nome)`, `update(id, nome)`, `remove(id)`
- Atualizar controller e routes com as novas funções

### 5. CRUD de Produtos
- Criar service, controller e routes para produtos
- Funções: `getAll(usuario_id)`, `create()`, `update()`, `remove()`, `toggleComprado(id)`

### 6. CRUD de Links
- Criar service, controller e routes para links
- Funções: `getByProduto(produto_id)`, `create(produto_id, url, nome_loja)`, `remove(id)`

### 7. Frontend com React
- Criar com `npm create vite@latest front-end -- --template react`
- Instalar axios para fazer as requisições HTTP à API
- Telas: Login, Cadastro, Wishlist (lista de produtos), Categorias

### 8. Tailwind CSS
- Adicionar ao frontend após as telas estarem funcionando

### 9. Upload de imagem dos produtos (deixar para o final)

---

## Preferências e combinados
- Commits em inglês
- Commit e push após cada arquivo/feature concluída
- Comentários nos arquivos em português, na primeira pessoa, simples e detalhados
- Claude não entrega código pronto, apenas guia
- Padrão de commit: `feat:` para features, `docs:` para comentários, `chore:` para configs
