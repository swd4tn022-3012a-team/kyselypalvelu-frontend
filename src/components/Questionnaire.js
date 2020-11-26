import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const Questionnaire = () => {
  const [questionnaire, setQuestionnaire] = useState({})

  const questionnaireId = useParams().id

  useEffect(() => {
    fetch(
      `https://kyselypalvelu-backend.herokuapp.com/questionnaires/${questionnaireId}`
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data)
        setQuestionnaire(data)
      })
  }, [questionnaireId])

  if (!questionnaire.questions) return <p>loading...</p>

  const onSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    console.log(data.getAll('answer'))
    //const answers = data.getAll('answer')
    const answerObjects = []
    for (let i = 0; i < questionnaire.questions.length; i++) {
      const answers = data.getAll(questionnaire.questions[i].questionText)
      for(const answer of answers) {
        const object = {
          text: answer,
          question: {
            questionId: questionnaire.questions[i].questionId,
          },
        }
        answerObjects.push(object)
      }
    }
    console.log('sending to backend', JSON.stringify(answerObjects))
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answerObjects),
    }
    fetch(
      `https://kyselypalvelu-backend.herokuapp.com/answers/${questionnaireId}`,
      requestOptions
    ).then((response) => {
      console.log(response)
    })
  }
  return (
    <div>
      <Link to="/">Takaisin</Link>
      <h1>Kyselypalvelu</h1>
      <h2>{questionnaire.title}</h2>
      <p>{questionnaire.description}</p>

      <form onSubmit={onSubmit}>
        {questionnaire.questions.map((question) => {
          if (
            question.type.name === 'radio' ||
            question.type.name === 'checkbox'
          ) {
            return (
              <div key={question.questionId}>
                <p>{question.questionText}</p>
                {question.options.values.map((value) => (
                  <div key={value}>
                    <label htmlFor={value}>{value}</label>
                    <input
                      type={question.type.name}
                      id={value}
                      name={question.questionText}
                      value={value}
                    />
                  </div>
                ))}
              </div>
            )
          }

          return (
            <div key={question.questionId}>
              <p>{question.questionText}</p>
              <input type="text" name={question.questionText} />
            </div>
          )
        })}
        <input type="submit" value="Lähetä" />
      </form>
    </div>
  )
}

export default Questionnaire
