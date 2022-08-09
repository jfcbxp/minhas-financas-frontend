import React, { useEffect } from "react"
import { logar, deslogar, obterUsuarioaAutenticado, isUsuarioAutenticado } from "../app/service/AuthService";

export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

export default function ProvedorAutenticacao({ children }) {
    const [usuarioAutenticado, setUsuarioAutenticado] = React.useState(null)
    const [isAutenticado, setAutenticado] = React.useState(null)

    const iniciarSessao = (usuario) => {
        logar(usuario)
        setUsuarioAutenticado(usuario)
        setAutenticado(true)

    }

    const encerrarSessao = () => {
        deslogar()
        setUsuarioAutenticado(null)
        setAutenticado(false)
    }
/*
    useEffect(() => {
        setUsuarioAutenticado(obterUsuarioaAutenticado())
        setAutenticado(isUsuarioAutenticado())
        console.log(obterUsuarioaAutenticado(),usuarioAutenticado)

    }, [isAutenticado]);
*/
    return (
        <AuthProvider value={{ iniciarSessao, encerrarSessao, usuarioAutenticado, isAutenticado }}>
            {children}
        </AuthProvider>
    )
}