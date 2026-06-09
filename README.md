# Linkório

Acesse em produção: [linkorio.vercel.app](https://linkorio.vercel.app)

Aplicação web full stack para salvar e organizar itens de interesse — produtos, cursos, artigos ou qualquer coisa que você queira guardar. Cada item pode ter múltiplos links de fontes diferentes, uma categoria personalizada e pode ser marcado como concluído. Conta com autenticação de usuários, modo claro/escuro e está hospedada em produção.

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

## Deploy

- **Frontend:** [linkorio.vercel.app](https://linkorio.vercel.app) — Vercel
- **Backend + Banco:** Railway
