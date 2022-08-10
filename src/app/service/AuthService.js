import { obterItem, removerItem, adicionarItem } from "./LocalStorageService";
import jwt_decode from "jwt-decode";

const USUARIO_LOGADO = "_usuario_logado"
const TOKEN = "_access_token"


export function isUsuarioAutenticado() {
    let isTokenValido = false;
    const token = obterItem(TOKEN)
    if (token) {

        const decodedToken = jwt_decode(token)
        const expiration = decodedToken.exp
        isTokenValido = (expiration * 1000) > Date.now()
    }

    return isTokenValido
}

export function deslogar() {
    removerItem(USUARIO_LOGADO)
    removerItem(TOKEN)

}

export function logar(usuario, token) {
    adicionarItem(USUARIO_LOGADO, usuario)
    adicionarItem(TOKEN, token)
}

export function obterUsuario() {
    return obterItem(USUARIO_LOGADO)
}

export function obterToken() {
    return obterItem(TOKEN)
}



