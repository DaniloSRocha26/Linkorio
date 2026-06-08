import { createContext, useContext, useState } from "react"

// Contexto de autenticação compartilhado entre todas as páginas
const AuthContext = createContext()

//Decodifica o payload do JWT sem biblioteca externa
function decodificarToken(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]))
    } catch {
        return {}
    }
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"))

    //Pego o nome do usuário diretamente do payload do token
    const usuario = token ? decodificarToken(token) : {}

    function login(novoToken) {
        localStorage.setItem("token", novoToken)
        setToken(novoToken)
    }

    function logout() {
        localStorage.removeItem("token")
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ token, login, logout, usuario }}>
            {children}
        </AuthContext.Provider>
    )
}

// Hook para acessar o contexto de autenticação em qualquer componente
export function useAuth() {
    return useContext(AuthContext)
}
