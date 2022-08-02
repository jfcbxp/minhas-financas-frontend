import React from 'react';
import NavBarItem from '../components/navbarItem';

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
                        <NavBarItem href="/" label="Home" />
                        <NavBarItem href="/login" label="Login" />
                        <NavBarItem href="/cadastro-usuario" label="Cadastro" />

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar;