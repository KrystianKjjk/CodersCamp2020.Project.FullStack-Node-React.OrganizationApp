import React from 'react';
import ManageUser from './components/ManageUser/ManageUser';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import ManageGrades from "./components/ManageGrades";

function App() {
  return (
    <div className="App">
        <Router>
            <Route path="/:userID" component={ManageUser} />
            <Route path="/grades" component={ManageGrades} />
        </Router>
    </div>
  );
}

export default App;
