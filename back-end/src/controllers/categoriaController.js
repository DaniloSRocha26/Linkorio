//Importo a função getAll do categoria.Service.js
import { getAll } from "../services/categoriaService.js";

//Faço uma função assíncrona para pegar todas as categorias e devolver
//como um json
async function getAllCategorias(req, res){
    try{
        //Passo o id do usuário logado que o middleware autenticar
        //salvou em req.user após validar o token
       const categorias = await getAll(req.user.id)
       res.json(categorias)
    }catch(error){
        res.status(500).json({ message: error.message})
    }

}

export {getAllCategorias}