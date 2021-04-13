import React from 'react';
import './App.css';
import MainView from './components/MainView';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Router>
        <MainView/>
      </Router>
    </div>
  );
}

export default App;
