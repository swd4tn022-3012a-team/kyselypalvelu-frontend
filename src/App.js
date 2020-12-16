import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Answers from './components/Answers'
import Questionnaire from './components/Questionnaire'
import Questionnaires from './components/Questionnaires'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>  
        <Route path="/answers/:id" component={Answers} />
        <Route path="/questionnaires/:id" component={Questionnaire} />
        <Route path="/" exact component={Questionnaires} />
      </Switch>
    </Router>
  )
}

export default App
