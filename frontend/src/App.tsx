import React from 'react'
import './App.css'
import MainView from './pages/Common/MainView'
import { BrowserRouter as Router } from 'react-router-dom'
import Snackbar from './components/Snackbar'

function App() {
  return (
    <div className="App">
      <Router>
        <MainView />
      </Router>
      <Snackbar />
    </div>
  )
}

export default App
