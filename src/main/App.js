import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import React from 'react';
import Login from '../views/login';
import CadastroUsuario from '../views/cadastroUsuario';
import Rotas from './rotas';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Rotas />
      </div>
    )
  }
}

export default App;
