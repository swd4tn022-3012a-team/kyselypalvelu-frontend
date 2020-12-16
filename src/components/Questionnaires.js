import { Divider } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import RateReviewIcon from '@material-ui/icons/RateReview';
import Container from '@material-ui/core/Container'



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
      <Typography variant="h2" style={{margin:'50px'}} >Kyselypalvelu</Typography>
      {questionnaires.map((q) => (
      <Container
        maxWidth="sm"
        key={q.questionnaireId}
        >
        <Divider/>
        <List>
        <ListItem>
          <ListItemText
          disableTypography
          primary={<Typography variant="h5">{q.title}</Typography>}
          secondary={q.description} 
          />
        </ListItem>
        <ListItem>
          <IconButton
            component={Link}
            to={`/questionnaires/${q.questionnaireId}`}
            ><span style={{fontSize: "80%"}}>Vastaa</span>
              <RateReviewIcon />
          </IconButton>
          <ListItemText primary="" secondary="" />
            <ListItemSecondaryAction>
              <IconButton
              component={Link}
              to={`/answers/${q.questionnaireId}`}
              edge="end"
              ><span style={{fontSize: "80%"}}>Vastaukset</span>
                <QuestionAnswerIcon />
              </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
      </List>
      
      <Divider />
      </Container>
      ))}
    </div>
  );
};

export default Questionnaires;