import React from 'react';
import { useNavigate } from 'react-router-dom'
import UsuarioService from '../app/service/UsuarioService';
import { AuthContext } from '../main/ProvedorAutenticacao';

const withNavigate = Component => props => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
};

class Home extends React.Component {

    state = {
        saldo: 0,
        mensagemErro: ""
    }

    constructor() {
        super()
        this.usuarioService = new UsuarioService();
    }

    componentDidMount() {
        const usuarioLogado = this.context.usuarioAutenticado
        this.usuarioService.obterSaldoPorUsuario(6)
            .then(response => {
                this.setState({ saldo: response.data })
            }).catch(erro => {
                this.setState({ mensagemErro: erro.response.status })
            })
    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" href="/cadastro-usuario" role="button"><i className="fa fa-users"></i>  Cadastrar Usuário</a>
                    <a className="btn btn-danger btn-lg" href="/cadastro-lancamento" role="button"><i className="fa fa-users"></i>  Cadastrar Lançamento</a>
                </p>
            </div>

        )
    }
}

Home.contextType = AuthContext

export default withNavigate(Home)