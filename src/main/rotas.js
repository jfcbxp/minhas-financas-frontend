import React from 'react';
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import Login from '../views/Login';
import CadastroUsuario from '../views/CadastroUsuario';
import Home from '../views/Home';

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas