import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import ManageUser from './components/ManageUser/ManageUser';
import ManageGrades from "./components/ManageGrades";
import FindSection from "./components/FindSection";

function App() {
  return (
    <div className="App">
        <Router>
            <Route path="/sections" component={FindSection} />
            <Route path="/:userID" component={ManageUser} />
            <Route path="/grades" component={ManageGrades} />
        </Router>
    </div>
  );
}

export default App;
