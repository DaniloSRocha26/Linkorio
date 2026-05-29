//Não esquece de mudar o nome dessas merdas

import { create, getByproduto, remove } from "../services/linkService.js";

//Busca todos os links de um produto pelo id do produto que vem na URL

async function getAllLinks(req, res){
    try{
         const links = await getByproduto(req.params.produto_id)
        res.json(links)
    }catch(error){
        res.status(500).json({ message: error.message})
    }
}

//Cria um novo link vinculado ao produto, com url e nome da loja vindos do body
async function creatingLink(req, res) {
    try{
        const createLink = await create(req.params.produto_id, req.body.url, req.body.nome_loja)
        res.status(201).json(createLink)
    }catch(error){
        res.status(500).json({ message: error.message})
    }
}

//Remove um link pelo id que vem na URL
async function removingLink(req, res) {
    try{
        const removeLink = await remove(req.params.id)
        res.status(200).json({ message: "Link removido"})
    }catch(error){
        res.status(500).json({ message: error.message})
    }
}

export {getAllLinks, creatingLink, removingLink}
