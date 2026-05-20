import { register,login } from "../services/usuarioService.js";

//Função responsável para criação do usuário no banco de dados
async function registerUsuario(req, res){
    try{
        //pega os dados que o usuário mandou na requisição
        const {nome, email, senha} = req.body

        //chama o service pra criar o usuário no banco
        const registers = await register(nome, email, senha)

        //devolve o usua´rio com status 201(criado)
        res.status(201).json(registers)
    } catch(error){
        res.status(500).json({ message: error.message})
    }
}

//Função responsável para validação dos dados do usuário no login do sistema
async function loginUsuario(req, res){
    try{
        //Pega email e senha da requisição
        const{email, senha} = req.body
        
        // chama o service que valida as credenciais e gera o token
        const token = await login( email, senha)

        //devolve o token com status 200(sucesso)
        res.status(200).json(token)
    } catch(error){
        res.status(500).json({ message: error.message})
    }
}

export {registerUsuario, loginUsuario}