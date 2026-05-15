// Importo o dotenv, que é responsável por ler o arquivo .env
// e transformar cada linha dele em uma variável acessível via process.env.NOME
import dotenv from "dotenv"

// Importo o Pool do pacote "pg", que é o driver do PostgreSQL para Node.js
// O Pool funciona como um gerenciador de conexões com o banco:
// em vez de abrir e fechar uma conexão a cada consulta (o que é lento),
// ele mantém conexões abertas e reutiliza conforme necessário
import { Pool } from "pg"

// Ativo o dotenv para que ele leia o .env antes de qualquer uso das variáveis
dotenv.config()

// Crio a instância do Pool com as configurações do banco
// Todas as informações vêm do .env — nunca coloco senhas diretamente no código!
const pool = new Pool({
    host: process.env.DB_HOST,         // Endereço do banco (localhost é minha própria máquina)
    port: process.env.DB_PORT,         // Porta padrão do PostgreSQL é 5432
    user: process.env.DB_USER,         // Usuário do banco (normalmente postgres)
    password: process.env.DB_PASSWORD, // Senha que defini na instalação do PostgreSQL
    database: process.env.DB_NAME,     // Nome do banco que criei no pgAdmin (inventory)
})

// Exporto o pool para que outros arquivos possam usá-lo para fazer consultas no banco
export default pool
