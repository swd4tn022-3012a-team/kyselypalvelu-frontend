import React, {useEffect, useState} from "react"
import { Link } from 'react-router-dom'


function Answers({ match }) {

    const [answers, setAnswers] = useState([])

    useEffect(()=> {
        fetch(`https://kyselypalvelu-backend.herokuapp.com/answers/${match.params.id}`)
      .then((response) => response.json())
      .then((data) => setAnswers(data))
      .catch((err) => console.log(err));
  }, [])

  console.log(match)

  if (answers.length === 0) return <p>Vastaus puuttuu <Link to="/">Takaisin</Link></p>

  return (

      <div>
          <Link to="/">Takaisin</Link>

          <ul>
              {answers.map((answers, index)=>{
              return <li key={index}>
                  <h2>{answers.question.questionText}</h2>
                  <p> {answers.text}</p>
                  </li>
              })}
          </ul>
      </div>
  )
}
export default Answers;