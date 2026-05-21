import jwt from "jsonwebtoken"

// Middleware que protege as rotas — verifica se o usuário tem um token JWT válido
function autenticar(req, res, next){
    let token

    // Pego o cabeçalho Authorization da requisição (o || é caso venha em minúsculo)
    // O frontend manda o token assim: Authorization: Bearer eyJhbGc...
    let authHeader = req.headers.Authorization || req.headers.authorization

    //Esse código aqui embaixo foi do youtube meu dog, refatorar essa porra aqui depois
    // Verifico se o cabeçalho existe e se começa com "Bearer" (padrão JWT)
    if(authHeader && authHeader.startsWith("Bearer")){

        // Separo o "Bearer " do token em si — split(" ") vira ["Bearer", "token"] e [1] pega só o token
        token = authHeader.split(" ")[1]

        // Se por algum motivo o token vier vazio depois do split, bloqueio a requisição
        if(!token){
            return res.status(401).json({ message: "No Token, authorization denied!" })
        }

        try{
            // Verifico se o token é válido usando a chave secreta — se for, decode tem o id do usuário
            const decode = jwt.verify(token, process.env.JWT_SECRET)

            // Salvo os dados do usuário na requisição para os controllers poderem usar
            req.user = decode
            console.log("The decode user is: ", req.user)

            // Token válido — deixo a requisição continuar para o controller
            next()

        }catch(err){
            // Token inválido ou expirado
            res.status(400).json({ message: "Token is not valid" })
        }
    } else{
        // Sem cabeçalho Authorization — acesso negado
        res.status(401).json({ message: "access denied"})
    }
}

export default autenticar