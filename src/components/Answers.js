import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    console.log(json.questions);
    setQuestions(json.questions);
  };

  useEffect(() => {
    fetchQuestions();
    fetchAnswers();
  }, [match.params.id]); // eslint-disable-line

  if (answers.length === 0)
    return (
      <p>
        Vastaus puuttuu <Link to="/">Takaisin</Link>
      </p>
    );

  return (
    <div>
      <Link to="/">Takaisin</Link>

      <ul>
        {questions.map((q, index) => {
          return (
            <div key={index}>
              <h2>{q.questionText}</h2>
              {answers
                .filter((a) => a.question.questionId === q.questionId)
                .map((a, index) => (
                  <div key={index}>{a.text}</div>
                ))}
            </div>
          );
        })}
      </ul>
    </div>
  );
}
export default Answers;
