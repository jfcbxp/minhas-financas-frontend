import React from 'react';
import Card from '../components/Card';
import FormGroup from '../components/FormGroup';
import { useNavigate } from 'react-router-dom'
import UsuarioService from '../app/service/UsuarioService';
import LocalStorageService from '../app/service/LocalStorageService';

const withNavigate = Component => props => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
};

class Login extends React.Component {

    state = {
        email: '',
        senha: '',
        mensagemErro: ''
    }

    constructor() {
        super();
        this.usuarioService = new UsuarioService();

    }

    entrar = async () => {
        this.usuarioService.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            LocalStorageService.adicionarItem('_usuario_logado',response.data)
            this.usuarioAutenticado()
        }).catch(erro => {
            this.setState({ mensagemErro: erro.response.status })
        })

    }

    usuarioAutenticado = () => {
        const navigate = this.props.navigate;
        navigate('/');
    }

    prepareCadastrar = () => {
        const navigate = this.props.navigate;
        navigate('/cadastro-usuario');
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6" style={{ position: 'relative', left: '300px' }} >
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row" >
                                <span>{this.state.mensagemErro}</span>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                                <input type="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })}
                                                    className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Digite o email" />
                                            </FormGroup>
                                            <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                <input type="password" value={this.state.senha} onChange={e => this.setState({ senha: e.target.value })}
                                                    className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" placeholder="Digite a senha" />
                                            </FormGroup>
                                            <button onClick={this.entrar} type="button" className="btn btn-success">Entrar</button>
                                            <button onClick={this.prepareCadastrar} type="button" className="btn btn-danger">Cadastrar</button>

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
}

export default withNavigate(Login);