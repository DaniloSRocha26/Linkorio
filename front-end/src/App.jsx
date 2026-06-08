import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Wishlist from "./pages/Wishlist"
import Categorias from "./pages/Categorias"

// Rota protegida — redireciona para login se não estiver autenticado
function RotaProtegida({ children }) {
    const { token } = useAuth()
    return token ? <Layout>{children}</Layout> : <Navigate to="/login" />
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={
                        <RotaProtegida>
                            <Wishlist />
                        </RotaProtegida>
                    } />
                    <Route path="/categorias" element={
                        <RotaProtegida>
                            <Categorias />
                        </RotaProtegida>
                    } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
