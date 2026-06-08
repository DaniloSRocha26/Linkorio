import Sidebar from "./Sidebar"

//Layout base das páginas autenticadas — sidebar fixa à esquerda e conteúdo à direita
export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen bg-[var(--bg)]">
            <Sidebar />
            <main className="ml-56 flex-1 px-8 py-8 max-w-5xl">
                {children}
            </main>
        </div>
    )
}
