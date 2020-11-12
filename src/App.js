import React, { useState, useEffect } from "react";

function App() {
  const [questionnaire, setQuestionnaire] = useState({});
  
  useEffect(() => {
    fetch("http://localhost:8080/questionnaires/1")
      .then((response) => response.json())
      .then((data) => setQuestionnaire(data));
  }, []);

  if (!questionnaire.questions) return <p>loading...</p>;

  const onSubmit = (event) => {
      event.preventDefault()
      const data = new FormData(event.target)
      console.log(data.getAll("answer"))
      const answers = data.getAll("answer")
      const answerObjects = []
      for (let i = 0; i < answers.length; i++) {
        const object = {
          text: answers[i],
          question: questionnaire.questions[i],
        }
        answerObjects.push(object)
      }
      console.log('sending to backend', JSON.stringify(answerObjects))
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(answerObjects)
      }
      fetch('http://localhost:8080/answers/1', requestOptions).then(response => {
        console.log(response)
      })
  }
  return (
    <div>
      <h1>Kyselypalvelu</h1>
      <h2>{questionnaire.title}</h2>
      <p>{questionnaire.description}</p>

      <form onSubmit={onSubmit}>
        {questionnaire.questions.map((question) => (
          <div key={question.questionId}>
            <p>{question.questionText}</p>
            <input type="text" name="answer" />
          </div>
        ))} 
        <input type="submit" value="Lähetä"/>
      </form>
    </div>
  );
}

export default App;
