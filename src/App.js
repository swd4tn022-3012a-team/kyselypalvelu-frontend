import React, { useState, useEffect } from "react";

function App() {
  const [questionnaire, setQuestionnaire] = useState({});
  
  useEffect(() => {
    fetch("https://kyselypalvelu-backend.herokuapp.com/questionnaires/1")
      .then((response) => response.json())
      .then((data) => setQuestionnaire(data));
  }, []);

  if (!questionnaire.questions) return <p>loading...</p>;

  const onSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.target);
      console.log(data.getAll("answer"))
      const answers = data.getAll("answer");
      

  };
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
