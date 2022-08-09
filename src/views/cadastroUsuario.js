import React from 'react';
import Card from '../components/Card';
import FormGroup from '../components/FormGroup';
import { useNavigate } from 'react-router-dom'
import UsuarioService from '../app/service/UsuarioService';
import { mensagemErro, mensagemSucesso } from '../components/Toastr';
import { AuthConsumer } from '../main/ProvedorAutenticacao';

function CadastroUsuario() {
    const [state, setState] = React.useState({ nome: "", email: "", senha: "", senhaRepeticao: "" });
    const [usuarioService] = React.useState(() => new UsuarioService());
    const navigate = useNavigate();

    const cadastrar = () => {
        const usuario = {
            nome: state.nome,
            email: state.email,
            senha: state.senha,
            senhaRepeticao: state.senhaRepeticao
        }

        try {
            usuarioService.validar(usuario)
        } catch (erro) {
            erro.mensagens.forEach(mensagem => {
                mensagemErro(mensagem)
            });
            return false
        }
        usuarioService.salvar(usuario).then(response => {
            mensagemSucesso('Usuario cadastrado com sucesso!')
            navigate("/login");
        }).catch(error => {
            mensagemErro(error.response.data)
        })
    }

    const voltar = () => {
        navigate(-1);
    }
    return (
        <Card title="Cadastro de Usuario">
            <div className="row">
                <div className="col-lg-12">
                    <div className="bs-component">

                        <fieldset>
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text" className="form-control" id="inputNome" name="nome" placeholder="Digite seu nome"
                                    value={state.nome} onChange={e => setState({ ...state, nome: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="email" className="form-control" id="inputEmail" name="email" placeholder="Digite seu email"
                                    value={state.email} onChange={e => setState({ ...state, email: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password" className="form-control" id="inpuSenha" name="senha" placeholder="Digite sua senha"
                                    value={state.senha} onChange={e => setState({ ...state, senha: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Repita a Senha: *" htmlFor="inputSenhaRepeticao">
                                <input type="password" className="form-control" id="inpuSenhaRepeticao" name="senhaRepeticao" placeholder="Repita a senha"
                                    value={state.senhaRepeticao} onChange={e => setState({ ...state, senhaRepeticao: e.target.value })} />
                            </FormGroup>
                            <button onClick={cadastrar} type="button" className="btn btn-success">Salvar</button>
                            <button onClick={voltar} type="button" className="btn btn-danger">Voltar</button>

                        </fieldset>
                    </div>

                </div>

            </div>
        </Card>

    )

}

export default () => (
    <AuthConsumer>
        {
            (contexto) => (<CadastroUsuario contexto={contexto} />)
        }
    </AuthConsumer>
)