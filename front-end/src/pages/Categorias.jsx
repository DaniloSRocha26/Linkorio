import { useState, useEffect } from "react"
import { X, Pencil } from "lucide-react"
import api from "../services/api"

export default function Categorias() {
    const [categorias, setCategorias] = useState([])
    const [novoNome, setNovoNome] = useState("")
    const [editandoId, setEditandoId] = useState(null)
    const [editandoNome, setEditandoNome] = useState("")

    useEffect(() => {
        buscarCategorias()
    }, [])

    async function buscarCategorias() {
        const resposta = await api.get("/categorias")
        setCategorias(resposta.data)
    }

    async function criarCategoria(e) {
        e.preventDefault()
        if (!novoNome.trim()) return
        await api.post("/categorias", { nome: novoNome })
        setNovoNome("")
        buscarCategorias()
    }

    async function salvarEdicao(id) {
        await api.put(`/categorias/${id}`, { nome: editandoNome })
        setEditandoId(null)
        buscarCategorias()
    }

    async function removerCategoria(id) {
        await api.delete(`/categorias/${id}`)
        buscarCategorias()
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-xl font-bold text-white">Categorias</h1>
                <p className="text-xs text-[#9CA3AF] mt-0.5">{categorias.length} categorias criadas</p>
            </div>

            <form onSubmit={criarCategoria} className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Nova categoria..."
                    value={novoNome}
                    onChange={(e) => setNovoNome(e.target.value)}
                    className="flex-1 bg-[#1A1D29] border border-[#2A2E3D] rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition"
                />
                <button
                    type="submit"
                    className="bg-[#8B5CF6] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#7C3AED] transition-colors"
                >
                    Adicionar
                </button>
            </form>

            <ul className="flex flex-col gap-2">
                {categorias.map((cat) => (
                    <li key={cat.id} className="bg-[#1A1D29] border border-[#2A2E3D] rounded-xl px-4 py-3 flex items-center justify-between hover:border-[#3A3E4D] transition-colors">
                        {editandoId === cat.id ? (
                            <div className="flex gap-2 flex-1 mr-2">
                                <input
                                    value={editandoNome}
                                    onChange={(e) => setEditandoNome(e.target.value)}
                                    className="flex-1 bg-[#0F1117] border border-[#2A2E3D] rounded-lg px-2 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition"
                                />
                                <button onClick={() => salvarEdicao(cat.id)} className="text-sm text-[#8B5CF6] font-medium hover:text-[#A78BFA] transition-colors">Salvar</button>
                                <button onClick={() => setEditandoId(null)} className="text-sm text-[#6B7280] hover:text-[#9CA3AF] transition-colors">Cancelar</button>
                            </div>
                        ) : (
                            <span className="text-sm font-medium text-white">{cat.nome}</span>
                        )}
                        {editandoId !== cat.id && (
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => { setEditandoId(cat.id); setEditandoNome(cat.nome) }}
                                    className="text-[#6B7280] hover:text-[#8B5CF6] transition-colors p-1.5 rounded-lg hover:bg-[#2A2E3D]"
                                >
                                    <Pencil size={14} />
                                </button>
                                <button
                                    onClick={() => removerCategoria(cat.id)}
                                    className="text-[#6B7280] hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-[#2A2E3D]"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}
