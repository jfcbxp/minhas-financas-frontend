import LocalStorageService from "./LocalStorageService";

export const USUARIO_LOGADO = "_usuario_logado"


export function isUsuarioAutenticado() {
    const usuario = LocalStorageService.obterItem(USUARIO_LOGADO)
    return !!usuario
}

export function deslogar() {
    LocalStorageService.removerItem(USUARIO_LOGADO)
}

export function logar(usuario) {
    LocalStorageService.adicionarItem(USUARIO_LOGADO, usuario)
}

export function obterUsuarioaAutenticado() {
    return LocalStorageService.obterItem(USUARIO_LOGADO)
}



