import React from 'react';
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import Login from '../views/login';
import CadastroUsuario from '../views/cadastroUsuario';

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas