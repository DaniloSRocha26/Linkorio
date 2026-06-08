import pool from "../config/db.js"

//Busca todos os produtos do usuário logado já com a contagem de links de cada um
async function getAll(usuario_id){
    const result = await pool.query(
        `SELECT p.*, COUNT(l.id)::int AS link_count
         FROM produtos p
         LEFT JOIN links l ON l.produto_id = p.id
         WHERE p.usuario_id = $1
         GROUP BY p.id`,
        [usuario_id]
    )
    return result.rows
}

//Cria um novo produto vinculado ao usuário logado e retorna o produto criado
async function create(usuario_id, categoria_id, nome, descricao){
    const result = await pool.query('INSERT INTO produtos (usuario_id, categoria_id, nome, descricao) VALUES($1, $2, $3, $4) RETURNING *', [usuario_id, categoria_id, nome, descricao])
    return result.rows[0]
}

//Atualiza nome, descrição e categoria de um produto filtrando pelo seu id
async function update(id, nome, descricao, categoria_id, usuario_id){
    const result = await pool.query('UPDATE produtos SET nome = $1, descricao = $2,  categoria_id = $3 WHERE id = $4 AND usuario_id = $5 RETURNING *', [nome, descricao, categoria_id, id, usuario_id])
    return result.rows[0]
}

//Remove um produto filtrando pelo seu id
async function remove(id, usuario_id){
    const result = await pool.query('DELETE FROM produtos WHERE id = $1 AND usuario_id = $2', [id, usuario_id])
}

//Inverte o campo comprado do produto — se era false vira true e vice-versa
async function toggleComprado(id, usuario_id){
    const result = await pool.query('UPDATE produtos SET comprado = NOT comprado WHERE id = $1 AND usuario_id = $2 RETURNING *', [id, usuario_id])
    return result.rows[0]
}

export {getAll, create, update, remove, toggleComprado}

