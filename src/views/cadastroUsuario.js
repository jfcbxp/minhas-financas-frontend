import React from 'react';
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { useNavigate } from 'react-router-dom'

const withNavigate = Component => props => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    cadastrar = () => {
        console.log('Nome', this.state.nome)
        console.log('Email', this.state.email)
        console.log('Senha', this.state.senha)
        console.log('senhaRepeticao', this.state.senhaRepeticao)
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
                                    <input type="text" className="form-control" id="inputNome" name='nome' placeholder="Digite seu nome"
                                        value={this.state.nome} onChange={e => this.setState({ nome: e.target.value })} />
                                </FormGroup>
                                <FormGroup label="Email: *" htmlFor="inputEmail">
                                    <input type="email" className="form-control" id="inputEmail" name='email' placeholder="Digite seu email"
                                        value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                                </FormGroup>
                                <FormGroup label="Senha: *" htmlFor="inputSenha">
                                    <input type="password" className="form-control" id="inpuSenha" name='senha' placeholder="Digite sua senha"
                                        value={this.state.senha} onChange={e => this.setState({ senha: e.target.value })} />
                                </FormGroup>
                                <FormGroup label="Repita a Senha: *" htmlFor="inputSenhaRepeticao">
                                    <input type="password" className="form-control" id="inpuSenhaRepeticao" name='senhaRepeticao' placeholder="Repita a senha"
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

export default withNavigate ( CadastroUsuario )