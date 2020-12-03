import { Button, Divider } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Questionnaires = () => {
  const [questionnaires, setQuestionnaires] = useState([]);

  const url = "https://kyselypalvelu-backend.herokuapp.com/questionnaires";

  useEffect(() => {
    const fetchQuestionnaires = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setQuestionnaires(json);
    };
    fetchQuestionnaires();
  }, []);

  if (questionnaires.length === 0) return <p>loading...</p>;

  return (
    <div>
      <a href="https://kyselypalvelu-backend.herokuapp.com/newquestionnaire">
        uuden kyselyn luonti testailua varten
      </a>
      <h1>Kyselyt</h1>
      <Divider />
      {questionnaires.map((q) => (
        <div key={q.questionnaireId}>
          <h3>
            <Link
              key={q.questionnaireId}
              to={`/questionnaires/${q.questionnaireId}`}
            >
              {q.title}
            </Link>
          </h3>
          <p>{q.description}</p>
          <Link to={`/answers/${q.questionnaireId}`}>
            <Button color="primary" variant="outlined">
              Vastaukset
            </Button>
          </Link>
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default Questionnaires;
