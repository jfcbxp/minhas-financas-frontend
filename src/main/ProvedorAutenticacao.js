import React, { useEffect } from "react"
import { logar, deslogar, isUsuarioAutenticado, obterUsuario, obterToken } from "../app/service/AuthService";
import { registrarToken } from "../app/ApiService";
import jwt_decode from "jwt-decode";
export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

export default function ProvedorAutenticacao({ children }) {
    const [usuarioAutenticado, setUsuarioAutenticado] = React.useState(null)
    const [isAutenticado, setAutenticado] = React.useState(null)

    const iniciarSessao = (tokenDTO) => {
        const token = tokenDTO.token
        const claims = jwt_decode(token)
        const usuario = {
            id: claims.id,
            nome: claims.nome
        }
        registrarToken(token)
        logar(usuario, token)
        setUsuarioAutenticado(usuario)
        setAutenticado(true)

    }

    const encerrarSessao = () => {
        deslogar()
        setUsuarioAutenticado(null)
        setAutenticado(false)
    }

    useEffect(() => {
        console.log("checagem")
        if (isUsuarioAutenticado()) {
            registrarToken(obterToken())
            setUsuarioAutenticado(obterUsuario())
            setAutenticado(true)
        } else {
            encerrarSessao()
        }

    }, []);

    return (
        <AuthProvider value={{ iniciarSessao, encerrarSessao, usuarioAutenticado, isAutenticado }}>
            {children}
        </AuthProvider>
    )
}