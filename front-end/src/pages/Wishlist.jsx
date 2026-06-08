import { useState, useEffect } from "react"
import api from "../services/api"
import Navbar from "../components/Navbar"

export default function Wishlist() {
    const [produtos, setProdutos] = useState([])
    const [categorias, setCategorias] = useState([])
    const [mostrarForm, setMostrarForm] = useState(false)
    const [nome, setNome] = useState("")
    const [descricao, setDescricao] = useState("")
    const [categoriaId, setCategoriaId] = useState("")
    const [linkAberto, setLinkAberto] = useState(null)
    const [links, setLinks] = useState({})
    const [novaUrl, setNovaUrl] = useState("")
    const [novaNomeLoja, setNovaNomeLoja] = useState("")

    useEffect(() => {
        buscarProdutos()
        buscarCategorias()
    }, [])

    async function buscarProdutos() {
        const resposta = await api.get("/produtos")
        setProdutos(resposta.data)
    }

    async function buscarCategorias() {
        const resposta = await api.get("/categorias")
        setCategorias(resposta.data)
    }

    async function criarProduto(e) {
        e.preventDefault()
        await api.post("/produtos", {
            nome,
            descricao,
            categoria_id: categoriaId || null
        })
        setNome("")
        setDescricao("")
        setCategoriaId("")
        setMostrarForm(false)
        buscarProdutos()
    }

    async function toggleComprado(id) {
        await api.patch(`/produtos/${id}/comprado`)
        buscarProdutos()
    }

    async function removerProduto(id) {
        await api.delete(`/produtos/${id}`)
        buscarProdutos()
    }

    async function abrirLinks(produtoId) {
        if (linkAberto === produtoId) {
            setLinkAberto(null)
            return
        }
        const resposta = await api.get(`/links/${produtoId}`)
        setLinks((prev) => ({ ...prev, [produtoId]: resposta.data }))
        setLinkAberto(produtoId)
    }

    async function adicionarLink(e, produtoId) {
        e.preventDefault()
        await api.post(`/links/${produtoId}`, { url: novaUrl, nome_loja: novaNomeLoja })
        setNovaUrl("")
        setNovaNomeLoja("")
        const resposta = await api.get(`/links/${produtoId}`)
        setLinks((prev) => ({ ...prev, [produtoId]: resposta.data }))
    }

    async function removerLink(linkId, produtoId) {
        await api.delete(`/links/${linkId}`)
        const resposta = await api.get(`/links/${produtoId}`)
        setLinks((prev) => ({ ...prev, [produtoId]: resposta.data }))
    }

    function nomeCategoria(id) {
        return categorias.find((c) => c.id === id)?.nome || ""
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-2xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Minha Wishlist</h1>
                    <button
                        onClick={() => setMostrarForm(!mostrarForm)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                    >
                        {mostrarForm ? "Cancelar" : "+ Produto"}
                    </button>
                </div>

                {mostrarForm && (
                    <form onSubmit={criarProduto} className="bg-white border border-gray-200 rounded-2xl p-5 mb-6 flex flex-col gap-3">
                        <input
                            type="text"
                            placeholder="Nome do produto"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <input
                            type="text"
                            placeholder="Descrição (opcional)"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <select
                            value={categoriaId}
                            onChange={(e) => setCategoriaId(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-600"
                        >
                            <option value="">Sem categoria</option>
                            {categorias.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.nome}</option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                        >
                            Adicionar
                        </button>
                    </form>
                )}

                <ul className="flex flex-col gap-3">
                    {produtos.map((produto) => (
                        <li key={produto.id} className={`bg-white border rounded-2xl p-4 ${produto.comprado ? "border-green-200" : "border-gray-200"}`}>
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                    <p className={`font-medium text-gray-800 ${produto.comprado ? "line-through text-gray-400" : ""}`}>
                                        {produto.nome}
                                    </p>
                                    {produto.descricao && (
                                        <p className="text-sm text-gray-500 mt-0.5">{produto.descricao}</p>
                                    )}
                                    {produto.categoria_id && (
                                        <span className="inline-block mt-1 text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
                                            {nomeCategoria(produto.categoria_id)}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <button
                                        onClick={() => toggleComprado(produto.id)}
                                        className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${produto.comprado ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                                    >
                                        {produto.comprado ? "Comprado" : "Marcar"}
                                    </button>
                                    <button
                                        onClick={() => abrirLinks(produto.id)}
                                        className="text-xs text-indigo-500 hover:text-indigo-700 transition-colors"
                                    >
                                        Links
                                    </button>
                                    <button
                                        onClick={() => removerProduto(produto.id)}
                                        className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>

                            {linkAberto === produto.id && (
                                <div className="mt-3 border-t border-gray-100 pt-3">
                                    <ul className="flex flex-col gap-1 mb-3">
                                        {(links[produto.id] || []).length === 0 && (
                                            <p className="text-xs text-gray-400">Nenhum link ainda.</p>
                                        )}
                                        {(links[produto.id] || []).map((link) => (
                                            <li key={link.id} className="flex items-center justify-between gap-2">
                                                <a
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-sm text-indigo-600 hover:underline truncate"
                                                >
                                                    {link.nome_loja || link.url}
                                                </a>
                                                <button
                                                    onClick={() => removerLink(link.id, produto.id)}
                                                    className="text-xs text-gray-400 hover:text-red-500 shrink-0"
                                                >
                                                    ✕
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    <form onSubmit={(e) => adicionarLink(e, produto.id)} className="flex gap-2">
                                        <input
                                            type="url"
                                            placeholder="https://..."
                                            value={novaUrl}
                                            onChange={(e) => setNovaUrl(e.target.value)}
                                            required
                                            className="flex-1 border border-gray-300 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Loja (opcional)"
                                            value={novaNomeLoja}
                                            onChange={(e) => setNovaNomeLoja(e.target.value)}
                                            className="w-28 border border-gray-300 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                        />
                                        <button
                                            type="submit"
                                            className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-indigo-700 transition-colors"
                                        >
                                            +
                                        </button>
                                    </form>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
