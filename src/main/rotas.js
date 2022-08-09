import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from '../views/Login';
import CadastroUsuario from '../views/CadastroUsuario';
import Home from '../views/Home';
import ConsultaLancamento from '../views/lancamento/ConsultaLancamento';
import CadastroLancamento from '../views/lancamento/CadastroLancamento';
import { AuthConsumer } from '../main/ProvedorAutenticacao';
import NavBar from '../components/NavBar';

function Rotas(props) {
    return (

        <BrowserRouter>
        <NavBar />
            <Routes>
            
                <Route path="/login" element={props.contexto.isAutenticado ? <Home /> : <Login />} />
                <Route path="/cadastro-usuario" element={props.contexto.isAutenticado ? <CadastroUsuario /> : <Login />} />
                <Route path="/" element={props.contexto.isAutenticado ? <Home /> : <Login />} />
                <Route path="/consulta-lancamento" element={props.contexto.isAutenticado ? <ConsultaLancamento /> : <Login />} />
                <Route path="/cadastro-lancamento">
                    <Route index element={props.contexto.isAutenticado ? <CadastroLancamento /> : <Login />} />
                    <Route path=":id" element={props.contexto.isAutenticado ? <CadastroLancamento /> : <Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default () => (
    <AuthConsumer>
        {
            (contexto) => (<Rotas contexto={contexto} />)
        }
    </AuthConsumer>
)