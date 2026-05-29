//Importo as funções do produtoService.js
import { create, getAll, update, remove, toggleComprado } from "../services/produtoService.js";

//Busca todos os produtos do usuário logado e devolve como JSON
async function getAllProdutos(req, res){
    try{
        //Passo o id do usuário logado que o middleware autenticar salvou em req.user
        const produtos = await getAll(req.user.id)
        res.json(produtos)
    }catch(error){
        res.status(500).json({ message: error.message})
    }
}

//Cria um novo produto vinculado ao usuário logado e devolve o produto criado
async function creatingProduto(req, res){
    try{
        //Passo o id do usuário (do token), e os dados do produto que vieram no body
        const createProduto = await create(req.user.id, req.body.categoria_id, req.body.nome, req.body.descricao)
        res.status(201).json(createProduto)
    }catch(error){
        res.status(500).json({ message: error.message})
    }
}

//Atualiza nome, descrição e categoria de um produto pelo id que vem na URL
async function updatingProduto(req, res){
    try{
        const updateProduto = await update(req.params.id, req.body.nome, req.body.descricao, req.body.categoria_id, req.user.id)
        res.status(200).json(updateProduto)
    }catch(error){
        res.status(500).json({ message: error.message})
    }
}

//Remove um produto pelo id que vem na URL
async function removingProduto(req, res){
    try{
        await remove(req.params.id, req.user.id)
        res.status(200).json({ message: "Produto removido com sucesso" })
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}

//Inverte o campo comprado do produto, true vira false e vice-versa
async function toggleCompradoConfirm(req, res){
    try{
        const produto = await toggleComprado(req.params.id, req.user.id)
        res.status(200).json(produto)
    }catch(error){
        res.status(500).json({ message: error.message})
    }
}

export {getAllProdutos, creatingProduto, updatingProduto, removingProduto, toggleCompradoConfirm}