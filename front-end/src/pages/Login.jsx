import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../services/api"
import { useAuth } from "../context/AuthContext"

export default function Login() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [erro, setErro] = useState("")
    const { login } = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setErro("")
        try {
            const resposta = await api.post("/usuarios/login", { email, senha })
            login(resposta.data)
            navigate("/")
        } catch (error) {
            setErro("Email ou senha incorretos.")
        }
    }

    return (
        <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <h1 className="text-3xl font-bold text-[#6366F1] text-center mb-1">MyLinkVault</h1>
                <p className="text-[#6B7280] text-sm text-center mb-8">Entre na sua conta</p>

                <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                            Entrar
                        </button>
                    </form>

                    <p className="text-xs text-center text-[#6B7280] mt-4">
                        Não tem conta?{" "}
                        <Link to="/register" className="text-[#6366F1] hover:text-[#4F46E5] transition-colors font-medium">
                            Cadastre-se
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
