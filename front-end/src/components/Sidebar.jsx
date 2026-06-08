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
                ? "bg-[#EEF2FF] text-[#6366F1] font-medium"
                : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F8FAFC]"
        }`
    }

    return (
        <aside className="fixed top-0 left-0 h-screen w-56 bg-white border-r border-[#E5E7EB] flex flex-col px-3 py-5 z-20">
            <div className="px-3 mb-8">
                <span className="text-lg font-bold text-[#6366F1] tracking-tight">MyLinkVault</span>
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
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#6B7280] hover:text-red-500 hover:bg-[#F8FAFC] transition-colors"
            >
                <LogOut size={16} />
                Sair
            </button>
        </aside>
    )
}
