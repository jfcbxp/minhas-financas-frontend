import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from '../views/Login';
import CadastroUsuario from '../views/CadastroUsuario';
import Home from '../views/Home';
import ConsultaLancamento from '../views/lancamento/ConsultaLancamento';
import CadastroLancamento from '../views/lancamento/CadastroLancamento';
import AuthService from '../app/service/AuthService';

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={AuthService.isUsuarioAutenticado() ? <Home /> : <Login />} />
                <Route path="/cadastro-usuario" element={AuthService.isUsuarioAutenticado() ? <Home /> : <CadastroUsuario />} />
                <Route path="/" element={AuthService.isUsuarioAutenticado() ? <Home /> : <Login />} />
                <Route path="/consulta-lancamento" element={AuthService.isUsuarioAutenticado() ? <ConsultaLancamento /> : <Login />} />
                <Route path="/cadastro-lancamento">
                    <Route index element={AuthService.isUsuarioAutenticado() ? <CadastroLancamento /> : <Login />} />
                    <Route path=":id" element={AuthService.isUsuarioAutenticado() ? <CadastroLancamento /> : <Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas