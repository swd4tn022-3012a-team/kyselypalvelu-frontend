import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Questionnaire from './components/Questionnaire'
import Questionnaires from './components/Questionnaires'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/questionnaires/:id">
          <Questionnaire />
        </Route>
        <Route path="/">
          <Questionnaires />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
