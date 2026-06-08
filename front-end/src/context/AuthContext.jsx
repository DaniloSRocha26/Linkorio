import { createContext, useContext, useState } from "react"

// Contexto de autenticação compartilhado entre todas as páginas
const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"))

    function login(novoToken) {
        localStorage.setItem("token", novoToken)
        setToken(novoToken)
    }

    function logout() {
        localStorage.removeItem("token")
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// Hook para acessar o contexto de autenticação em qualquer componente
export function useAuth() {
    return useContext(AuthContext)
}
