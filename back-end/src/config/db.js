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
// Em produção o Railway fornece DATABASE_URL automaticamente
// Em desenvolvimento uso as variáveis individuais do .env
const pool = new Pool(
    process.env.DATABASE_URL
        ? { connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }
        : {
            host: process.env.DB_HOST,         // Endereço do banco
            port: process.env.DB_PORT,         // Porta padrão do PostgreSQL é 5432
            user: process.env.DB_USER,         // Usuário do banco
            password: process.env.DB_PASSWORD, // Senha do banco
            database: process.env.DB_NAME,     // Nome do banco
          }
)

// Exporto o pool para que outros arquivos possam usá-lo para fazer consultas no banco
export default pool
