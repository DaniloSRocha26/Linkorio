// Importo o Express, que é o framework que uso para criar o servidor e as rotas da API
import express from "express"

// Importo o cors, que permite que o frontend (rodando em outra porta) acesse minha API
// Sem isso, o navegador bloquearia as requisições por segurança
import cors from "cors"

// Importo o dotenv para poder usar as variáveis do arquivo .env
import dotenv from "dotenv"

//importando os routers
import categoriasRoutes from "./src/routes/categoriaRoutes.js"
import usuarioRoutes from "./src/routes/usuarioRoutes.js"
import produtosRoutes from "./src/routes/produtoRoutes.js"
import linksRoutes from "./src/routes/linkRoutes.js"
// Ativo o dotenv antes de qualquer coisa, para as variáveis já estarem disponíveis
dotenv.config()

// Crio a aplicação Express que vai gerenciar todas as rotas e requisições
const app = express()

// Pego a porta do arquivo .env (defini como 3000)
const port = process.env.PORT

// Middlewares são funções que rodam em toda requisição antes de chegar nas rotas
app.use(cors())         // Libera o acesso do frontend à minha API
app.use(express.json()) // Faz o servidor entender JSON no corpo das requisições (ex: POST e PUT)

// Rota de teste para confirmar que o servidor está no ar
app.get('/', (req, res) => {
    res.send("Hello World")
})

//Registro as rotas de categorias, todas acessíveis a partir de /cateogrias
app.use('/categorias', categoriasRoutes)

//Registro as rotas de produtos
app.use('/produtos', produtosRoutes)

//Registro as rotas de usuário no servidor, registro e login
app.use(usuarioRoutes)

//Registro as rotas de links, acessíveis a partir de /links
app.use('/links', linksRoutes)

// Coloco o servidor para escutar na porta definida no .env
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
