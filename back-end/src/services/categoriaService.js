//Importo a instância do pool do db.js para fazer as queries no banco
import pool from "../config/db.js"

//Busca todas as categorias que pertencem ao usuário logado
async function getAll(usuario_id){
    const result = await pool.query('SELECT * FROM categorias WHERE usuario_id = $1', [usuario_id])
    return result.rows
}

//Cria uma nova categoria vinculada ao usuário logado e retorna a categoria criada
async function create(usuario_id, nome){
    const result = await pool.query('INSERT INTO categorias (usuario_id, nome) VALUES($1, $2) RETURNING *', [usuario_id, nome])
    return result.rows[0]
}

export {getAll, create}