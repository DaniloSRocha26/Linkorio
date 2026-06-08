import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../services/api"
import { useTheme } from "../context/ThemeContext"
import { Sun, Moon } from "lucide-react"
import logo from "../assets/Linkorio_LightMode.png"

export default function Register() {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [erro, setErro] = useState("")
    const { dark, toggle } = useTheme()
    const navigate = useNavigate()

    //Envia os dados para a API e redireciona para o login após o cadastro
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
        <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4 relative">
            <button
                onClick={toggle}
                className="absolute top-4 right-4 p-2 rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)] transition-colors"
                title={dark ? "Modo claro" : "Modo escuro"}
            >
                {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div className="w-full max-w-sm">
                <img src={logo} alt="MyLinkVault" className="h-20 w-auto mx-auto mb-2" />
                <p className="text-[var(--text)] text-lg font-semibold text-center mb-8">Crie sua conta</p>

                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-xs font-medium text-[var(--text-2)] mb-1.5">Nome</label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                                className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-lg px-3 py-2.5 text-sm text-[var(--text)] placeholder-[var(--faint)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-[var(--text-2)] mb-1.5">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-lg px-3 py-2.5 text-sm text-[var(--text)] placeholder-[var(--faint)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-[var(--text-2)] mb-1.5">Senha</label>
                            <input
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                                className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-lg px-3 py-2.5 text-sm text-[var(--text)] placeholder-[var(--faint)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition"
                            />
                        </div>

                        {/*Exibe a mensagem de erro se o cadastro falhar*/}
                        {erro && <p className="text-red-500 text-xs">{erro}</p>}

                        <button
                            type="submit"
                            className="bg-[var(--primary)] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[var(--primary-h)] transition-colors mt-1"
                        >
                            Cadastrar
                        </button>
                    </form>

                    <p className="text-xs text-center text-[var(--muted)] mt-4">
                        Já tem conta?{" "}
                        <Link to="/login" className="text-[var(--primary)] hover:text-[var(--primary-h)] transition-colors font-medium">
                            Entrar
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
