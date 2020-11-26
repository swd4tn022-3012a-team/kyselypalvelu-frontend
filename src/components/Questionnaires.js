import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Questionnaires = () => {
  const [questionnaires, setQuestionnaires] = useState([])

  const url = 'https://kyselypalvelu-backend.herokuapp.com//questionnaires'

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setQuestionnaires(data))
  }, [])



  if (questionnaires.length === 0) return <p>loading...</p>

  return (
    <div>
      <h1>Kyselyt</h1>
      {questionnaires.map((q) => (
        <Link key={q.questionnaireId} to={`/questionnaires/${q.questionnaireId}`}>{q.title}</Link>
      ))}
    </div>
  )
}

export default Questionnaires
