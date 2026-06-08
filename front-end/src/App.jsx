import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { ThemeProvider } from "./context/ThemeContext"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Wishlist from "./pages/Wishlist"
import Categorias from "./pages/Categorias"

//Componente que protege rotas — redireciona para login se não houver token
function RotaProtegida({ children }) {
    const { token } = useAuth()
    return token ? <Layout>{children}</Layout> : <Navigate to="/login" />
}

//Componente raiz que envolve tudo com os providers de tema e autenticação
function App() {
    return (
        <ThemeProvider>
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
        </ThemeProvider>
    )
}

export default App
