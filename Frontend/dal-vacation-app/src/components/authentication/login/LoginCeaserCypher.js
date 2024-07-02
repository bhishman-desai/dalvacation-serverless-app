import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from "@mui/material";

function LoginCeaserCypher() {
  const [cypherKey, setCypherKey] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    const retrieveQuestion = async () => {
      try {
        const response = await axios.post(
          "https://9xhx1z4603.execute-api.us-east-1.amazonaws.com/test/get-key",
          {
            username: username,
          }
        );
        console.log("Login cypher response", response);
        const { body } = response.data;
        setCypherKey(body);
        setCorrectAnswer(body);
      } catch (error) {
        setError("Error retrieving security question");
        console.error(error);
      }
    };
    retrieveQuestion();
  }, [username]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (answer === correctAnswer) {
      navigate("/");
      console.log("Answer is correct. Moving to the next step.");
    } else {
      setError("Incorrect answer. Please try again.");
    }
  };
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Ceaser Cypher
          </Typography>
          {cypherKey ? (
            <form onSubmit={submitHandler}>
              <Typography variant="body1" gutterBottom>
                Enter this key below: {cypherKey}
              </Typography>
              <TextField
                label="Your Answer"
                variant="outlined"
                fullWidth
                margin="normal"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              {error && (
                <Typography color="error" gutterBottom>
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Next
              </Button>
            </form>
          ) : (
            <Typography>Loading cypher key...</Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default LoginCeaserCypher;
