import ApiService from "../ApiService";
import ErroValidacao from "../exception/ErroValidacao";

class UsuarioService extends ApiService {
    constructor() {
        super("/api/usuarios")
    }

    autenticar(credenciais) {
        return this.post("/autenticar", credenciais)
    }

    obterSaldoPorUsuario(id) {
        return this.get(`/${id}`)
    }

    salvar(usuario) {
        return this.post("", usuario)
    }

    validar(usuario) {
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
}

export default UsuarioService;