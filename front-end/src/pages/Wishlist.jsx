import { useState, useEffect } from "react"
import { Link2, X, Plus, Check, Folder } from "lucide-react"
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

    function contarPorCategoria(catId) {
        return produtos.filter((p) => p.categoria_id === catId).length
    }

    const produtosFiltrados = filtroCategoria
        ? produtos.filter((p) => p.categoria_id === filtroCategoria)
        : produtos

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-[#111827]">Minha Lista</h1>
                    <p className="text-xs text-[#6B7280] mt-0.5">{produtos.length} itens salvos</p>
                </div>
                <button
                    onClick={() => setMostrarForm(!mostrarForm)}
                    className="flex items-center gap-1.5 bg-[#6366F1] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#4F46E5] transition-colors shadow-sm"
                >
                    <Plus size={15} />
                    {mostrarForm ? "Cancelar" : "Adicionar"}
                </button>
            </div>

            {/* Formulário */}
            {mostrarForm && (
                <form onSubmit={criarProduto} className="bg-white border border-[#E5E7EB] rounded-2xl p-5 mb-6 flex flex-col gap-3 shadow-sm">
                    <input
                        type="text"
                        placeholder="Nome do item"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        className="bg-[#F5F7FB] border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition"
                    />
                    <input
                        type="text"
                        placeholder="Descrição (opcional)"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        className="bg-[#F5F7FB] border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition"
                    />
                    <select
                        value={categoriaId}
                        onChange={(e) => setCategoriaId(e.target.value)}
                        className="bg-[#F5F7FB] border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition"
                    >
                        <option value="">Sem categoria</option>
                        {categorias.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.nome}</option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="bg-[#6366F1] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#4F46E5] transition-colors"
                    >
                        Salvar
                    </button>
                </form>
            )}

            {/* Filtros */}
            <div className="flex gap-2 mb-6 flex-wrap">
                <button
                    onClick={() => setFiltroCategoria("")}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                        filtroCategoria === ""
                            ? "bg-[#6366F1] text-white shadow-sm"
                            : "bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#6366F1] hover:text-[#6366F1]"
                    }`}
                >
                    Todas ({produtos.length})
                </button>
                {categorias.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setFiltroCategoria(cat.id)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                            filtroCategoria === cat.id
                                ? "bg-[#6366F1] text-white shadow-sm"
                                : "bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#6366F1] hover:text-[#6366F1]"
                        }`}
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
                        className={`bg-white border rounded-xl p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow ${
                            produto.comprado ? "border-[#BBF7D0]" : "border-[#E5E7EB]"
                        }`}
                    >
                        {/* Título + ações discretas */}
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <p className={`font-semibold text-sm leading-snug ${produto.comprado ? "line-through text-[#9CA3AF]" : "text-[#111827]"}`}>
                                    {produto.nome}
                                </p>
                                {produto.descricao && (
                                    <p className="text-xs text-[#6B7280] mt-0.5">{produto.descricao}</p>
                                )}
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                                {/* Botão de comprado como ícone */}
                                <button
                                    onClick={() => toggleComprado(produto.id)}
                                    title={produto.comprado ? "Desmarcar" : "Marcar como comprado"}
                                    className={`p-1.5 rounded-lg transition-colors ${
                                        produto.comprado
                                            ? "bg-[#F0FDF4] text-[#22C55E] border border-[#BBF7D0]"
                                            : "text-[#9CA3AF] hover:text-[#6366F1] hover:bg-[#EEF2FF]"
                                    }`}
                                >
                                    <Check size={13} />
                                </button>
                                <button
                                    onClick={() => removerProduto(produto.id)}
                                    className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <X size={13} />
                                </button>
                            </div>
                        </div>

                        {/* Metadados: categoria + links */}
                        <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                            {produto.categoria_id && (
                                <span className="flex items-center gap-1 bg-[#EEF2FF] text-[#6366F1] border border-[#C7D2FE] px-2 py-0.5 rounded-full font-medium">
                                    <Folder size={11} />
                                    {nomeCategoria(produto.categoria_id)}
                                </span>
                            )}
                            <button
                                onClick={() => abrirLinks(produto.id)}
                                className="flex items-center gap-1 hover:text-[#6366F1] transition-colors"
                            >
                                <Link2 size={11} />
                                {linkAberto === produto.id
                                    ? "Fechar links"
                                    : links[produto.id] !== undefined
                                        ? `${links[produto.id].length} ${links[produto.id].length === 1 ? "link" : "links"}`
                                        : "Ver links"
                                }
                            </button>
                        </div>

                        {/* Seção de links expandida */}
                        {linkAberto === produto.id && (
                            <div className="border-t border-[#F3F4F6] pt-3 flex flex-col gap-2">
                                <ul className="flex flex-col gap-1">
                                    {(links[produto.id] || []).length === 0 && (
                                        <p className="text-xs text-[#9CA3AF]">Nenhum link ainda.</p>
                                    )}
                                    {(links[produto.id] || []).map((link) => (
                                        <li key={link.id} className="flex items-center justify-between gap-2 group">
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-1.5 text-xs text-[#6366F1] hover:text-[#4F46E5] hover:underline truncate transition-colors"
                                            >
                                                <Link2 size={10} className="shrink-0" />
                                                {link.nome_loja || link.url}
                                            </a>
                                            <button
                                                onClick={() => removerLink(link.id, produto.id)}
                                                className="text-[#D1D5DB] hover:text-red-400 shrink-0 transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <X size={11} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <form onSubmit={(e) => adicionarLink(e, produto.id)} className="flex gap-2 mt-1">
                                    <input
                                        type="url"
                                        placeholder="https://..."
                                        value={novaUrl}
                                        onChange={(e) => setNovaUrl(e.target.value)}
                                        required
                                        className="flex-1 bg-[#F5F7FB] border border-[#E5E7EB] rounded-lg px-2 py-1.5 text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Loja"
                                        value={novaNomeLoja}
                                        onChange={(e) => setNovaNomeLoja(e.target.value)}
                                        className="w-24 bg-[#F5F7FB] border border-[#E5E7EB] rounded-lg px-2 py-1.5 text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-[#6366F1] text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[#4F46E5] transition-colors"
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
