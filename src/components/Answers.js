import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Statistics from "./Statistics";

function Answers({ match }) {
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);

  const fetchAnswers = async () => {
    const response = await fetch(
      `https://kyselypalvelu-backend.herokuapp.com/answers/${match.params.id}`
    );
    const json = await response.json();
    setAnswers(json);
  };
  const fetchQuestions = async () => {
    const response = await fetch(
      `https://kyselypalvelu-backend.herokuapp.com/questionnaires/${match.params.id}`
    );
    const json = await response.json();
    setQuestions(json.questions);
  };

  useEffect(() => {
    fetchQuestions();
    fetchAnswers();
  }, [match.params.id]); // eslint-disable-line

  if (answers.length === 0)
    return (
      <p style={{margin:"80px"}}>
        Vastaus puuttuu <Link to="/">Takaisin</Link>
      </p>
    );

  return (
    <div>
      <Link to="/">Takaisin</Link>

      <ul>
        {questions.map((q, index) => {
          if (q.type.name === "radio" || q.type.name === "checkbox") {
            return (
              <div key={index}>
                <h2>
                  {q.questionText} {`(${q.type.name})`}
                </h2>
                <Statistics id={q.questionId} question={q.questionText} />
              </div>
            );
          } else {
            return (
              <div key={index}>
                <h2>
                  {q.questionText} {`(${q.type.name})`}
                </h2>
                {answers
                  .filter((a) => a.question.questionId === q.questionId)
                  .map((a, index) => {
                    return <div key={index}>{a.text}</div>;
                  })}
              </div>
            );
          }
        })}
      </ul>
    </div>
  );
}
export default Answers;
