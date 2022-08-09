import {obterItem,removerItem,adicionarItem} from "./LocalStorageService";

const USUARIO_LOGADO = "_usuario_logado"


export function isUsuarioAutenticado() {
    const usuario = obterItem(USUARIO_LOGADO)
    return !!usuario
}

export function deslogar() {
    removerItem(USUARIO_LOGADO)
}

export function logar(usuario) {
    adicionarItem(USUARIO_LOGADO, usuario)
}

export function obterUsuarioaAutenticado() {
    return obterItem(USUARIO_LOGADO)
}



