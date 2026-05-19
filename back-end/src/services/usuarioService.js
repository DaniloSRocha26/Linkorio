import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import db from "../config/db.js"

async function register(nome, email, senha){
    const newSenha = await bcrypt.hash(senha, 10)
    const resultado = await db.query(
        'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
        [nome, email, newSenha]
    );
    return resultado.rows[0];
}

async function login(email, senha){
    try{
        const resultado = await db.query('SELECT * FROM usuarios WHERE email = $1', [email])

        if (resultado.rows.length === 0){
            throw new Error("Usuário não encontrado")
        }

        const usuario = resultado.rows[0]
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

        if (!senhaCorreta){
            throw new Error("Senha incorreta")
        }

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET)
        return token
    } catch(error){
        throw error
    }
}

export { register, login }