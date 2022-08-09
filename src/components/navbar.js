import React from 'react';
import NavBarItem from './NavBarItem';
import { AuthConsumer } from '../main/ProvedorAutenticacao';

function NavBar(props) {
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="/" className="navbar-brand">Minhas Finanças</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavBarItem render={props.contexto.isAutenticado} to="/" label="Home" />
                        <NavBarItem render={!props.contexto.isAutenticado} to="/cadastro-usuario" label="Cadastro" />
                        <NavBarItem render={props.contexto.isAutenticado} to="/consulta-lancamento" label="Lançamentos" />
                        <NavBarItem render={props.contexto.isAutenticado} to="/cadastro-lancamento" label="Cadastrar Lançamento" />
                        <NavBarItem render={!props.contexto.isAutenticado} to="/login" label="Login" />
                        <NavBarItem render={props.contexto.isAutenticado} to="/login" click={props.contexto.encerrarSessao} label="Sair" />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default () => (
    <AuthConsumer>
        {
            (contexto) => (<NavBar contexto={contexto} />)
        }
    </AuthConsumer>
)