import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { LayoutList, Tag, LogOut } from "lucide-react"

export default function Sidebar() {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    function handleLogout() {
        logout()
        navigate("/login")
    }

    function navClass(path) {
        const ativo = location.pathname === path
        return `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
            ativo
                ? "bg-violet-600 text-white font-medium"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
        }`
    }

    return (
        <aside className="fixed top-0 left-0 h-screen w-56 bg-zinc-900 border-r border-zinc-800 flex flex-col px-3 py-5 z-20">
            <div className="px-3 mb-8">
                <span className="text-lg font-bold text-violet-400 tracking-tight">Wishlist</span>
            </div>

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

            <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors"
            >
                <LogOut size={16} />
                Sair
            </button>
        </aside>
    )
}
