import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.min.css'
import 'toastr/build/toastr.min.js'

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

import React from 'react';
import Rotas from './Rotas';
import NavBar from '../components/NavBar';
import ProvedorAutenticacao from './ProvedorAutenticacao';

class App extends React.Component {
  render() {
    return (
      <ProvedorAutenticacao>

        <NavBar />
        <div className="container">
          <Rotas />
        </div>
      </ProvedorAutenticacao>
    )
  }
}

export default App;
