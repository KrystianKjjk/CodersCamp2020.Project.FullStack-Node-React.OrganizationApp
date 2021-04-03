import React from 'react';
import './App.css';
import MainView from './components/MainView';
import {BrowserRouter as Router} from 'react-router-dom';
import TeamProject from './components/TeamProject/TeamProject'

function App() {
  return (
    <div className="App">
    <Router>
      <TeamProject _id="6042af0f06ad6350dcdaee27" changeViewFn={()=>{return null}}/>
    </Router>
    </div>
  );
}

export default App;
