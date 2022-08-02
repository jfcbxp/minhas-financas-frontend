import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import React from 'react';
import Rotas from './Rotas';
import NavBar from '../components/NavBar';

class App extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <div className="container">
          <Rotas />
        </div>
      </>
    )
  }
}

export default App;
