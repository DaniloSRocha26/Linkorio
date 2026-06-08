import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
    const { logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate("/login")
    }

    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <Link to="/" className="text-lg font-semibold text-indigo-600">
                Wishlist
            </Link>
            <div className="flex items-center gap-4">
                <Link to="/categorias" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                    Categorias
                </Link>
                <button
                    onClick={handleLogout}
                    className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                >
                    Sair
                </button>
            </div>
        </nav>
    )
}
