import { useState, useEffect } from "react"
import { Link2, X, ChevronDown, ChevronUp, Plus } from "lucide-react"
import api from "../services/api"

export default function Wishlist() {
    const [produtos, setProdutos] = useState([])
    const [categorias, setCategorias] = useState([])
    const [mostrarForm, setMostrarForm] = useState(false)
    const [nome, setNome] = useState("")
    const [descricao, setDescricao] = useState("")
    const [categoriaId, setCategoriaId] = useState("")
    const [filtroCategoria, setFiltroCategoria] = useState("")
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
        await api.post("/produtos", { nome, descricao, categoria_id: categoriaId || null })
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

    // Conta quantos produtos pertencem a cada categoria
    function contarPorCategoria(catId) {
        return produtos.filter((p) => p.categoria_id === catId).length
    }

    const produtosFiltrados = filtroCategoria
        ? produtos.filter((p) => p.categoria_id === filtroCategoria)
        : produtos

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-white">Minha Lista</h1>
                    <p className="text-xs text-zinc-500 mt-0.5">{produtos.length} itens salvos</p>
                </div>
                <button
                    onClick={() => setMostrarForm(!mostrarForm)}
                    className="flex items-center gap-1.5 bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-violet-500 transition-colors"
                >
                    <Plus size={15} />
                    {mostrarForm ? "Cancelar" : "Adicionar"}
                </button>
            </div>

            {mostrarForm && (
                <form onSubmit={criarProduto} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-6 flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Nome do item"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                    />
                    <input
                        type="text"
                        placeholder="Descrição (opcional)"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                    />
                    <select
                        value={categoriaId}
                        onChange={(e) => setCategoriaId(e.target.value)}
                        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                    >
                        <option value="">Sem categoria</option>
                        {categorias.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.nome}</option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="bg-violet-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-violet-500 transition-colors"
                    >
                        Salvar
                    </button>
                </form>
            )}

            {/* Filtros de categoria com contagem */}
            <div className="flex gap-2 mb-6 flex-wrap">
                <button
                    onClick={() => setFiltroCategoria("")}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${filtroCategoria === "" ? "bg-violet-600 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"}`}
                >
                    Todas ({produtos.length})
                </button>
                {categorias.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setFiltroCategoria(cat.id)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${filtroCategoria === cat.id ? "bg-violet-600 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"}`}
                    >
                        {cat.nome} ({contarPorCategoria(cat.id)})
                    </button>
                ))}
            </div>

            {/* Grid de cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {produtosFiltrados.map((produto) => (
                    <div
                        key={produto.id}
                        className={`bg-zinc-900 border rounded-xl p-4 flex flex-col gap-2 ${produto.comprado ? "border-emerald-900 opacity-60" : "border-zinc-800"}`}
                    >
                        {/* Cabeçalho do card */}
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <p className={`font-semibold text-sm leading-snug ${produto.comprado ? "line-through text-zinc-500" : "text-white"}`}>
                                    {produto.nome}
                                </p>
                                {produto.descricao && (
                                    <p className="text-xs text-zinc-500 mt-0.5 truncate">{produto.descricao}</p>
                                )}
                            </div>
                            <button
                                onClick={() => removerProduto(produto.id)}
                                className="text-zinc-600 hover:text-red-400 transition-colors shrink-0 mt-0.5"
                            >
                                <X size={14} />
                            </button>
                        </div>

                        {/* Categoria + metadados */}
                        <div className="flex items-center gap-2">
                            {produto.categoria_id && (
                                <span className="text-xs bg-violet-950 text-violet-400 border border-violet-800 px-2 py-0.5 rounded-full">
                                    {nomeCategoria(produto.categoria_id)}
                                </span>
                            )}
                            {links[produto.id] !== undefined && (
                                <span className="text-xs text-zinc-600">
                                    {links[produto.id].length} {links[produto.id].length === 1 ? "link" : "links"}
                                </span>
                            )}
                        </div>

                        {/* Ações */}
                        <div className="flex items-center gap-2 mt-1">
                            <button
                                onClick={() => toggleComprado(produto.id)}
                                className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${produto.comprado ? "bg-emerald-950 text-emerald-400 border border-emerald-800" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"}`}
                            >
                                {produto.comprado ? "Comprado" : "Marcar"}
                            </button>
                            <button
                                onClick={() => abrirLinks(produto.id)}
                                className="flex items-center gap-1 text-xs text-zinc-500 hover:text-violet-400 transition-colors"
                            >
                                <Link2 size={13} />
                                Links
                                {linkAberto === produto.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                            </button>
                        </div>

                        {/* Seção de links */}
                        {linkAberto === produto.id && (
                            <div className="border-t border-zinc-800 pt-3 mt-1 flex flex-col gap-2">
                                <ul className="flex flex-col gap-1">
                                    {(links[produto.id] || []).length === 0 && (
                                        <p className="text-xs text-zinc-600">Nenhum link ainda.</p>
                                    )}
                                    {(links[produto.id] || []).map((link) => (
                                        <li key={link.id} className="flex items-center justify-between gap-2">
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 hover:underline truncate transition-colors"
                                            >
                                                <Link2 size={11} className="shrink-0" />
                                                {link.nome_loja || link.url}
                                            </a>
                                            <button
                                                onClick={() => removerLink(link.id, produto.id)}
                                                className="text-zinc-600 hover:text-red-400 shrink-0 transition-colors"
                                            >
                                                <X size={12} />
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
                                        className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Loja"
                                        value={novaNomeLoja}
                                        onChange={(e) => setNovaNomeLoja(e.target.value)}
                                        className="w-24 bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-violet-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-violet-500 transition-colors"
                                    >
                                        +
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
