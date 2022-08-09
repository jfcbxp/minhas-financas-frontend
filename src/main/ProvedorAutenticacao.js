import React from "react"
import AuthService from "../app/service/AuthService";

export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

export default function ProvedorAutenticacao({ children }) {
    const [usuarioAutenticado, setUsuarioAutenticado] = React.useState(null)
    const [isAutenticado, setAutenticado] = React.useState(null)

    const iniciarSessao = (usuario) => {
        AuthService.logar(usuario)
        setUsuarioAutenticado(usuario)
        setAutenticado(true)

    }

    return (
        <AuthProvider value={{ iniciarSessao, usuarioAutenticado, isAutenticado }}>
            {children}
        </AuthProvider>
    )
}