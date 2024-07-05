import React, { useState } from 'react';
import { Container, Typography, Select, TextField, Button, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SecurityQuestions() {
    const questions = [
        'What is your mother\'s maiden name?',
        'What is your favorite childhood pet?',
        'What is the name of your first school?',
        'What is your favorite sports team?',
        'What is your favorite movie?',
      ];
  const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate()
  const username = localStorage.getItem('username');

  const handleQuestionChange = (event) => {
    setSelectedQuestion(event.target.value);
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleNext = async (event) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_SIGNUP_SECURITY_QUESTION,
        {
          username: username,
          answers: answer,
          question: selectedQuestion
        }
      );
      console.log("Security Response", response);
      if (response.status === 200) {
        navigate("/signup/ceaser-cypher");
      }
    } catch (error) {
      console.log("Security Error", error);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="h4" sx={{my: 5}} component="h1" gutterBottom>
        Security Questions
      </Typography>
      <form>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="security-question-label">Security Question</InputLabel>
          <Select
            labelId="security-question-label"
            value={selectedQuestion}
            onChange={handleQuestionChange}
            label="Security Question"
          >
            {questions.map((question, index) => (
              <MenuItem key={index} value={question}>
                {question}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          type="text"
          value={answer}
          onChange={handleAnswerChange}
          placeholder="Enter your answer"
          fullWidth
          sx={{ mb: 3 }}
          variant="outlined"
        />
        <Box display="flex" justifyContent="center">
          <Button variant="contained" color="primary" size="large" onClick={handleNext}>
            Next
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default SecurityQuestions;
