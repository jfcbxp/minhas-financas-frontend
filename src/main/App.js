import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import React from 'react';
import NavBar from '../components/navbar';
import Rotas from './rotas';

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
