import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../services/api"

export default function Register() {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [erro, setErro] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setErro("")
        try {
            await api.post("/usuarios/register", { nome, email, senha })
            navigate("/login")
        } catch (error) {
            setErro("Erro ao cadastrar. Tente outro email.")
        }
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <h1 className="text-3xl font-bold text-white text-center mb-2">Wishlist</h1>
                <p className="text-zinc-500 text-sm text-center mb-8">Crie sua conta</p>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Nome</label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Senha</label>
                            <input
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                            />
                        </div>

                        {erro && <p className="text-red-400 text-xs">{erro}</p>}

                        <button
                            type="submit"
                            className="bg-violet-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-violet-500 transition-colors mt-1"
                        >
                            Cadastrar
                        </button>
                    </form>

                    <p className="text-xs text-center text-zinc-500 mt-4">
                        Já tem conta?{" "}
                        <Link to="/login" className="text-violet-400 hover:text-violet-300 transition-colors">
                            Entrar
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
