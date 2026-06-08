import axios from "axios"

// Em produção usa a URL do Railway, em desenvolvimento usa o localhost
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000"

// Instância do axios apontando para a API do backend
const api = axios.create({
    baseURL
})

// Interceptor que adiciona o token JWT em toda requisição automaticamente
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api
