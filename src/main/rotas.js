import React from 'react';
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import Login from '../views/Login';
import CadastroUsuario from '../views/CadastroUsuario';
import Home from '../views/Home';
import ConsultaLancamento from '../views/lancamento/ConsultaLancamento';
 
function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
                <Route path="/consulta-lancamento" element={<ConsultaLancamento />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas