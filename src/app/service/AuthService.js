import LocalStorageService from "./LocalStorageService";

export const USUARIO_LOGADO = "_usuario_logado"

export default class AuthService {
    static isUsuarioAutenticado() {
        const usuario = LocalStorageService.obterItem(USUARIO_LOGADO)
        return !!usuario
    }

    static deslogar() {
        LocalStorageService.removerItem(USUARIO_LOGADO)
    }

    static logar(usuario) {
        LocalStorageService.adicionarItem(USUARIO_LOGADO, usuario)
    }

    static obterUsuarioaAutenticado() {
        return LocalStorageService.obterItem(USUARIO_LOGADO)
    }

}