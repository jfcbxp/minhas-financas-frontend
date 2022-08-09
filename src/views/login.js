import React, { useEffect } from 'react';
import Card from '../components/Card';
import FormGroup from '../components/FormGroup';
import { useNavigate } from 'react-router-dom'
import { autenticar } from '../app/service/UsuarioService';
import { mensagemErro } from '../components/Toastr';
import { AuthConsumer } from '../main/ProvedorAutenticacao';

function Login(props) {
    const [state, setState] = React.useState({ email: "", senha: "" });
    const navigate = useNavigate();


    const entrar = async () => {
        autenticar({
            email: state.email,
            senha: state.senha
        }).then(response => {
            efetuarLogin(response.data)
        }).catch(erro => {
            console.log(erro)
            mensagemErro(erro.response.status)
        })

    }

    const efetuarLogin = async (usuario) => {
        await props.contexto.iniciarSessao(usuario)
        navigate("/");
    }

    const prepareCadastrar = () => {
        navigate("/cadastro-usuario");
    }

    return (
        <div className="row">
            <div className="col-md-6" style={{ position: "relative", left: "300px" }} >
                <div className="bs-docs-section">
                    <Card title="Login">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <fieldset>
                                        <FormGroup label="Email: *" htmlFor="inputEmail">
                                            <input type="email" value={state.email} onChange={e => setState({ ...state, email: e.target.value })}
                                                className="form-control" id="inputEmail" placeholder="Digite o email" />
                                        </FormGroup>
                                        <FormGroup label="Senha: *" htmlFor="inputPassword">
                                            <input type="password" value={state.senha} onChange={e => setState({ ...state, senha: e.target.value })}
                                                className="form-control" id="inputPassword" placeholder="Digite a senha" />
                                        </FormGroup>
                                        <button onClick={entrar} type="button" className="btn btn-success">Entrar</button>
                                        <button onClick={prepareCadastrar} type="button" className="btn btn-danger">Cadastrar</button>

                                    </fieldset>
                                </div>

                            </div>
                        </div>
                    </Card>

                </div>

            </div>
        </div>
    )
}

export default () => (
    <AuthConsumer>
        {
            (contexto) => (<Login contexto={contexto} />)
        }
    </AuthConsumer>
)