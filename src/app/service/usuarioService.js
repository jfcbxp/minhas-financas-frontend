import { getRest, postRest } from "../ApiService";
import ErroValidacao from "../exception/ErroValidacao";

const URL_SERVICE = "/api/usuarios"


export function autenticar(credenciais) {
    return postRest(`${URL_SERVICE}/autenticar`, credenciais)
}

export function obterSaldoPorUsuario(id) {
    return getRest(`${URL_SERVICE}/${id}`)
}

export function salvar(usuario) {
    return postRest(`${URL_SERVICE}/`, usuario)
}

export function validar(usuario) {
    const erros = []

    if (!usuario.nome) {
        erros.push("O campo Nome é obrigatorio.")
    }
    if (!usuario.email) {
        erros.push("O campo Email é obrigatorio.")

    } else if (!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
        erros.push("O campo Email é invalido.")
    }

    if (!usuario.senha || !usuario.senhaRepeticao) {
        erros.push("Digite a senha.")
    } else if (usuario.senha !== usuario.senhaRepeticao) {
        erros.push("Senha diferente a confirmação")

    }

    if (erros && erros.length > 0) {
        throw new ErroValidacao(erros)
    }
    return erros;
}
