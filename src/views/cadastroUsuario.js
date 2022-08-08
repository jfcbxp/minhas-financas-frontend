import React from 'react';
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card';
import FormGroup from '../components/FormGroup';
import UsuarioService from '../app/service/UsuarioService';
import { mensagemErro, mensagemSucesso } from '../components/Toastr';

const withNavigate = Component => props => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
};

class CadastroUsuario extends React.Component {

    state = {
        nome: "",
        email: "",
        senha: "",
        senhaRepeticao: ""
    }

    constructor() {
        super();
        this.usuarioService = new UsuarioService();
    }

    cadastrar = () => {
        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            senhaRepeticao: this.state.senhaRepeticao
        }

        try {
            this.usuarioService.validar(usuario)
        } catch (erro) {
            erro.mensagens.forEach(mensagem => {
                mensagemErro(mensagem)
            });
            return false
        }

        this.usuarioService.salvar(usuario).then(response => {
            mensagemSucesso('Usuario cadastrado com sucesso!')
            const navigate = this.props.navigate;
            navigate("/login");
        }).catch(error => {
            mensagemErro(error.response.data)
        })
    }

    voltar = () => {
        const navigate = this.props.navigate;

        navigate(-1);
    }

    render() {
        return (
            <Card title="Cadastro de Usuario">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">

                            <fieldset>
                                <FormGroup label="Nome: *" htmlFor="inputNome">
                                    <input type="text" className="form-control" id="inputNome" name="nome" placeholder="Digite seu nome"
                                        value={this.state.nome} onChange={e => this.setState({ nome: e.target.value })} />
                                </FormGroup>
                                <FormGroup label="Email: *" htmlFor="inputEmail">
                                    <input type="email" className="form-control" id="inputEmail" name="email" placeholder="Digite seu email"
                                        value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                                </FormGroup>
                                <FormGroup label="Senha: *" htmlFor="inputSenha">
                                    <input type="password" className="form-control" id="inpuSenha" name="senha" placeholder="Digite sua senha"
                                        value={this.state.senha} onChange={e => this.setState({ senha: e.target.value })} />
                                </FormGroup>
                                <FormGroup label="Repita a Senha: *" htmlFor="inputSenhaRepeticao">
                                    <input type="password" className="form-control" id="inpuSenhaRepeticao" name="senhaRepeticao" placeholder="Repita a senha"
                                        value={this.state.senhaRepeticao} onChange={e => this.setState({ senhaRepeticao: e.target.value })} />
                                </FormGroup>
                                <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                                <button onClick={this.voltar} type="button" className="btn btn-danger">Voltar</button>

                            </fieldset>
                        </div>

                    </div>

                </div>
            </Card>

        )
    }
}

export default withNavigate(CadastroUsuario)