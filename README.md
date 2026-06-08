# Linkório

Aplicação web para organizar e salvar links de produtos, cursos, artigos e qualquer coisa que você queira guardar para depois. Categorize, marque como concluído e acesse de qualquer lugar.

## Funcionalidades

- Cadastro e login de usuários com autenticação JWT
- Criação e gerenciamento de categorias personalizadas
- Adição de itens com nome, descrição e categoria
- Múltiplos links por item (de lojas ou fontes diferentes)
- Marcar itens como concluídos
- Filtro por categoria com contagem de itens
- Modo claro e escuro com preferência salva

## Stack

**Frontend**
- React + Vite
- Tailwind CSS
- Axios
- React Router DOM

**Backend**
- Node.js + Express
- PostgreSQL
- JWT (autenticação)
- Bcrypt (criptografia de senha)
- Helmet (segurança HTTP)

## Estrutura do projeto

```
Linkorio/
├── front-end/       # Aplicação React
├── back-end/        # API Express
└── database/        # Schema SQL
```

## Rodando localmente

### Pré-requisitos
- Node.js
- PostgreSQL

### Backend

```bash
cd back-end
npm install
```

Crie um arquivo `.env` com:

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=inventory
JWT_SECRET=sua_chave_secreta
```

Crie o banco no PostgreSQL e execute o `database/schema.sql`. Depois:

```bash
npm run dev
```

### Frontend

```bash
cd front-end
npm install
```

Crie um arquivo `.env` com:

```
VITE_API_URL=http://localhost:3000
```

Depois:

```bash
npm run dev
```

## Deploy

- **Backend + Banco:** [Railway](https://railway.app)
- **Frontend:** [Vercel](https://vercel.com)
