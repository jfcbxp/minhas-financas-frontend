import React from 'react';
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const withNavigate = Component => props => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
};

class Login extends React.Component {

    state = {
        email: '',
        senha: ''
    }

    entrar = () => {
        axios.post('http://localhost:8080/api/usuarios/autenticar', {
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            console.log(response)
        }).catch(erro => {
            console.log(erro.response)
        })

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