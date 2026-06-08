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
        <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <h1 className="text-3xl font-bold text-[#6366F1] text-center mb-1">MyLinkVault</h1>
                <p className="text-[#6B7280] text-sm text-center mb-8">Crie sua conta</p>

                <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-xs font-medium text-[#374151] mb-1.5">Nome</label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                                className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-[#374151] mb-1.5">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-[#374151] mb-1.5">Senha</label>
                            <input
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                                className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition"
                            />
                        </div>

                        {erro && <p className="text-red-500 text-xs">{erro}</p>}

                        <button
                            type="submit"
                            className="bg-[#6366F1] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#4F46E5] transition-colors mt-1"
                        >
                            Cadastrar
                        </button>
                    </form>

                    <p className="text-xs text-center text-[#6B7280] mt-4">
                        Já tem conta?{" "}
                        <Link to="/login" className="text-[#6366F1] hover:text-[#4F46E5] transition-colors font-medium">
                            Entrar
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
