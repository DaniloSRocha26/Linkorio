import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    function handleLogout() {
        logout()
        navigate("/login")
    }

    return (
        <nav className="bg-zinc-900 border-b border-zinc-800 px-6 py-3.5 flex items-center justify-between sticky top-0 z-10">
            <Link to="/" className="text-base font-bold text-violet-400 tracking-tight">
                Wishlist
            </Link>
            <div className="flex items-center gap-2">
                <Link
                    to="/categorias"
                    className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
                        location.pathname === "/categorias"
                            ? "bg-zinc-800 text-white"
                            : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                    }`}
                >
                    Categorias
                </Link>
                <button
                    onClick={handleLogout}
                    className="text-sm px-3 py-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                >
                    Sair
                </button>
            </div>
        </nav>
    )
}
