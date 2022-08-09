import React, { useEffect } from 'react';
import { obterSaldoPorUsuario } from '../app/service/UsuarioService';
import { AuthConsumer } from '../main/ProvedorAutenticacao';

function Home(props) {
    const [state, setState] = React.useState({ saldo: 0, mensagemErro: "" });

    useEffect(() => {
        const usuarioLogado = props.contexto.usuarioAutenticado
        obterSaldoPorUsuario(usuarioLogado.id)
            .then(response => {
                setState({ saldo: response.data })
            }).catch(erro => {
                setState({ mensagemErro: erro.response.status })
            })
    }, []);


    return (
        <div className="jumbotron">
            <h1 className="display-3">Bem vindo!</h1>
            <p className="lead">Esse é seu sistema de finanças.</p>
            <p className="lead">Seu saldo para o mês atual é de R$ {state.saldo}</p>
            <hr className="my-4" />
            <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>

        </div>

    )
}

export default () => (
    <AuthConsumer>
        {
            (contexto) => (<Home contexto={contexto} />)
        }
    </AuthConsumer>
)