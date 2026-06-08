import { useState, useEffect } from "react"
import { X, Pencil } from "lucide-react"
import api from "../services/api"

export default function Categorias() {
    const [categorias, setCategorias] = useState([])
    const [novoNome, setNovoNome] = useState("")
    //editandoId guarda o id da categoria que está sendo editada no momento
    const [editandoId, setEditandoId] = useState(null)
    const [editandoNome, setEditandoNome] = useState("")

    useEffect(() => {
        buscarCategorias()
    }, [])

    //Busca todas as categorias do usuário logado
    async function buscarCategorias() {
        const resposta = await api.get("/categorias")
        setCategorias(resposta.data)
    }

    //Cria uma nova categoria e atualiza a lista
    async function criarCategoria(e) {
        e.preventDefault()
        if (!novoNome.trim()) return
        await api.post("/categorias", { nome: novoNome })
        setNovoNome("")
        buscarCategorias()
    }

    //Salva o novo nome da categoria editada e sai do modo de edição
    async function salvarEdicao(id) {
        await api.put(`/categorias/${id}`, { nome: editandoNome })
        setEditandoId(null)
        buscarCategorias()
    }

    //Remove uma categoria e atualiza a lista
    async function removerCategoria(id) {
        await api.delete(`/categorias/${id}`)
        buscarCategorias()
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-xl font-bold text-[var(--text)]">Categorias</h1>
                <p className="text-xs text-[var(--muted)] mt-0.5">{categorias.length} categorias criadas</p>
            </div>

            <form onSubmit={criarCategoria} className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Nova categoria..."
                    value={novoNome}
                    onChange={(e) => setNovoNome(e.target.value)}
                    className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2.5 text-sm text-[var(--text)] placeholder-[var(--faint)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition"
                />
                <button
                    type="submit"
                    className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[var(--primary-h)] transition-colors"
                >
                    Adicionar
                </button>
            </form>

            <ul className="flex flex-col gap-2">
                {categorias.map((cat) => (
                    <li key={cat.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-3 flex items-center justify-between hover:border-[var(--primary-b)] transition-colors shadow-sm">
                        {/*Modo de edição: exibe input com o nome atual*/}
                        {editandoId === cat.id ? (
                            <div className="flex gap-2 flex-1 mr-2">
                                <input
                                    value={editandoNome}
                                    onChange={(e) => setEditandoNome(e.target.value)}
                                    className="flex-1 bg-[var(--surface-2)] border border-[var(--border)] rounded-lg px-2 py-1 text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition"
                                />
                                <button onClick={() => salvarEdicao(cat.id)} className="text-sm text-[var(--primary)] font-medium hover:text-[var(--primary-h)] transition-colors">Salvar</button>
                                <button onClick={() => setEditandoId(null)} className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors">Cancelar</button>
                            </div>
                        ) : (
                            <span className="text-sm font-medium text-[var(--text)]">{cat.nome}</span>
                        )}
                        {/*Botões de editar e remover visíveis quando não está editando*/}
                        {editandoId !== cat.id && (
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => { setEditandoId(cat.id); setEditandoNome(cat.nome) }}
                                    className="text-[var(--faint)] hover:text-[var(--primary)] transition-colors p-1.5 rounded-lg hover:bg-[var(--primary-s)]"
                                >
                                    <Pencil size={14} />
                                </button>
                                <button
                                    onClick={() => removerCategoria(cat.id)}
                                    className="text-[var(--faint)] hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50"
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
