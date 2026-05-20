import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import db from "../config/db.js"

//Função para regisrar o usuário pegando nome, email e senha
//como parâmetros
async function register(nome, email, senha){
    //bcrypt.hash está gerando um hash de senha, e 10 é o quanto o bcrypt
    //trabalhar para gerar a senha
    const hashSenha = await bcrypt.hash(senha, 10)

    //Está inserindo o usuário no banco com a senha criptografada
    const resultado = await db.query(
        'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
        [nome, email, hashSenha]
    );
    //Está pegando o primeiro e unico resultado e retornando
    return resultado.rows[0];
}

//Função de Login do usuário
async function login(email, senha){
    try{

        //Busca o usuário pelo email
        const user = await db.query('SELECT * FROM usuarios WHERE email = $1', [email])

        //Está verificando se nenhum usuário foi encontrado
        if  (user.rows.length === 0){
            throw new Error ("usuário não enconrado")
        }
        const usuario = user.rows[0]

        //Compara a senha digitada com o hash salvo no banco de dados
        const senhaComparada = await bcrypt.compare(senha, usuario.senha)

        if (senhaComparada === false){
            throw new Error("Email ou senha incorretos")
        }
        
        //Gera um token com o idd do usuário dentro, assinado com a chave secreta
        const token = jwt.sign({ id: usuario.id}, process.env.JWT_SECRET)
        return token
    } catch(error){
        throw error
    }
}

export {register, login}