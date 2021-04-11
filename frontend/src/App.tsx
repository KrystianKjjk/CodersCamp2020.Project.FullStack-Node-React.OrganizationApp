import React, {useEffect} from 'react';
import './App.css';
import MainView from './components/MainView';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {

  useEffect(() => {
    document.title = "Coders Camp Organization App"
  }, [])

  return (
    <div className="App">
    <Router>
      <MainView/>
    </Router>
    </div>
  );
}

export default App;
