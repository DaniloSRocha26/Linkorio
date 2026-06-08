import { useState, useEffect } from "react"
import api from "../services/api"
import Navbar from "../components/Navbar"

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
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Categorias</h1>

                <form onSubmit={criarCategoria} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="Nova categoria..."
                        value={novoNome}
                        onChange={(e) => setNovoNome(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                    >
                        Adicionar
                    </button>
                </form>

                <ul className="flex flex-col gap-2">
                    {categorias.map((cat) => (
                        <li key={cat.id} className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between">
                            {editandoId === cat.id ? (
                                <div className="flex gap-2 flex-1 mr-2">
                                    <input
                                        value={editandoNome}
                                        onChange={(e) => setEditandoNome(e.target.value)}
                                        className="flex-1 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    />
                                    <button onClick={() => salvarEdicao(cat.id)} className="text-sm text-indigo-600 font-medium hover:underline">Salvar</button>
                                    <button onClick={() => setEditandoId(null)} className="text-sm text-gray-400 hover:underline">Cancelar</button>
                                </div>
                            ) : (
                                <span className="text-gray-700 text-sm">{cat.nome}</span>
                            )}
                            {editandoId !== cat.id && (
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => { setEditandoId(cat.id); setEditandoNome(cat.nome) }}
                                        className="text-sm text-gray-400 hover:text-indigo-600 transition-colors"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => removerCategoria(cat.id)}
                                        className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        Remover
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
