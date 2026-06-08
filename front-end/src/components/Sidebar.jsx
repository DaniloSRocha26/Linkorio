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
                ? "bg-[#8B5CF6] text-white font-medium"
                : "text-[#9CA3AF] hover:text-white hover:bg-[#1A1D29]"
        }`
    }

    return (
        <aside className="fixed top-0 left-0 h-screen w-56 bg-[#151721] border-r border-[#2A2E3D] flex flex-col px-3 py-5 z-20">
            <div className="px-3 mb-8">
                <span className="text-lg font-bold text-[#8B5CF6] tracking-tight">MyLinkVault</span>
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
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#6B7280] hover:text-red-400 hover:bg-[#1A1D29] transition-colors"
            >
                <LogOut size={16} />
                Sair
            </button>
        </aside>
    )
}
