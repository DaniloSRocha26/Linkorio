import { createContext, useContext, useState, useEffect } from "react"

//Contexto de tema compartilhado entre todos os componentes
const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    //Inicializo o estado lendo a preferência salva no localStorage
    const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark")

    //Toda vez que o tema muda, aplico a classe "dark" no html e salvo no localStorage
    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark)
        localStorage.setItem("theme", dark ? "dark" : "light")
    }, [dark])

    return (
        <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
            {children}
        </ThemeContext.Provider>
    )
}

//Hook para acessar o tema em qualquer componente
export function useTheme() {
    return useContext(ThemeContext)
}
