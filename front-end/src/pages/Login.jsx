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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 w-full max-w-sm">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Entrar</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Senha</label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    {erro && <p className="text-red-500 text-sm">{erro}</p>}

                    <button
                        type="submit"
                        className="bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                    >
                        Entrar
                    </button>
                </form>

                <p className="text-sm text-center text-gray-500 mt-4">
                    Não tem conta?{" "}
                    <Link to="/register" className="text-indigo-600 hover:underline">
                        Cadastre-se
                    </Link>
                </p>
            </div>
        </div>
    )
}
