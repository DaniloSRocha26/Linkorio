import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import { LayoutList, Tag, LogOut, Sun, Moon } from "lucide-react"

export default function Sidebar() {
    const { logout } = useAuth()
    const { dark, toggle } = useTheme()
    const navigate = useNavigate()
    const location = useLocation()

    //Desloga o usuário e redireciona para o login
    function handleLogout() {
        logout()
        navigate("/login")
    }

    //Retorna as classes do link de navegação — destaca o link da página atual
    function navClass(path) {
        const ativo = location.pathname === path
        return `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
            ativo
                ? "bg-[var(--primary-s)] text-[var(--primary)] font-medium"
                : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg)]"
        }`
    }

    return (
        <aside className="fixed top-0 left-0 h-screen w-56 bg-[var(--sidebar)] border-r border-[var(--sidebar-b)] flex flex-col px-3 py-5 z-20">
            {/*Logo e botão de alternar tema*/}
            <div className="px-3 mb-8 flex items-center justify-between">
                <span className="text-lg font-bold text-[var(--primary)] tracking-tight">MyLinkVault</span>
                <button
                    onClick={toggle}
                    className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg)] transition-colors"
                    title={dark ? "Modo claro" : "Modo escuro"}
                >
                    {dark ? <Sun size={15} /> : <Moon size={15} />}
                </button>
            </div>

            {/*Links de navegação*/}
            <nav className="flex flex-col gap-1 flex-1">
                <Link to="/" className={navClass("/")}>
                    <LayoutList size={16} />
                    Minha Lista
                </Link>
                <Link to="/categorias" className={navClass("/categorias")}>
                    <Tag size={16} />
                    Categorias
                </Link>
            </nav>

            {/*Botão de sair no rodapé da sidebar*/}
            <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[var(--muted)] hover:text-red-500 hover:bg-[var(--bg)] transition-colors"
            >
                <LogOut size={16} />
                Sair
            </button>
        </aside>
    )
}
