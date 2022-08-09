import React from 'react';
import NavBarItem from './NavBarItem';
import { AuthConsumer } from '../main/ProvedorAutenticacao';
import { useNavigate, Link } from 'react-router-dom'


function NavBar(props) {
    const navigate = useNavigate();
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="/" className="navbar-brand">Minhas Finanças</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavBarItem render={props.contexto.isAutenticado} onClick={() => navigate("/")} label="Home" />
                        <NavBarItem render={!props.contexto.isAutenticado} onClick={() => navigate("/cadastro-usuario")} label="Cadastro" />
                        <NavBarItem render={props.contexto.isAutenticado} onClick={() => navigate("/consulta-lancamento")} label="Lançamentos" />
                        <NavBarItem render={props.contexto.isAutenticado} onClick={() => navigate("/cadastro-lancamento")} label="Cadastrar Lançamento" />
                        <NavBarItem render={!props.contexto.isAutenticado} onClick={() => navigate("/login")} label="Login" />
                        <NavBarItem render={props.contexto.isAutenticado} onClick={props.contexto.encerrarSessao} label="Sair" />
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