import React from 'react';
import NavBarItem from './NavBarItem';
import AuthService from '../app/service/AuthService';

const deslogar = () => {
    AuthService.deslogar()
}

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
                        <NavBarItem render={AuthService.isUsuarioAutenticado()} href="/" label="Home" />
                        <NavBarItem render={!AuthService.isUsuarioAutenticado()} href="/cadastro-usuario" label="Cadastro" />
                        <NavBarItem render={AuthService.isUsuarioAutenticado()} href="/consulta-lancamento" label="Lançamentos" />
                        <NavBarItem render={AuthService.isUsuarioAutenticado()} href="/cadastro-lancamento" label="Cadastrar Lançamento" />
                        <NavBarItem render={!AuthService.isUsuarioAutenticado()} href="/login" label="Login" />
                        <NavBarItem render={AuthService.isUsuarioAutenticado()} onClick={deslogar} href="/login" label="Sair" />

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar;