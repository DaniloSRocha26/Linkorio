import axios from "axios"

// Instância do axios apontando para a API do backend
const api = axios.create({
    baseURL: "http://localhost:3000"
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
