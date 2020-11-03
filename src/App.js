import React, { useState, useEffect } from 'react'

function App() {
  const [questionnaire, setQuestionnaire] = useState({})

  useEffect(() => {
    fetch('http://localhost:8080/questionnaires/1')
      .then((response) => response.json())
      .then((data) => setQuestionnaire(data))
  }, [])

  if (!questionnaire.questions) return <p>loading...</p>

  return (
    <div>
      <h1>Kyselypalvelu</h1>
      <h2>{questionnaire.title}</h2>
      <p>{questionnaire.description}</p>

      {questionnaire.questions.map((question) => (
        <div key={question.questionId}>
          <p>{question.questionText}</p>
          <input type="text" />
        </div>
      ))}
    </div>
  )
}

export default App
