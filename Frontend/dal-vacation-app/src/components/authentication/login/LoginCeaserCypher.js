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

const generateRandomString = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

function LoginCeaserCypher() {
  const [cypherKey, setCypherKey] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [string, setString] = useState(generateRandomString(5));
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    const retrieveQuestion = async () => {
      try {
        const response = await axios.post(
          process.env.REACT_APP_LOGIN_CEASER_CYPHER,
          {
            username: username,
          }
        );
        console.log("Login cypher response", response);
        const { body } = response.data;
        setCypherKey(body);
        setCorrectAnswer(body);
      } catch (error) {
        setError("Error retrieving cypher key");
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
            Caesar Cypher
          </Typography>
          {cypherKey ? (
            <form onSubmit={submitHandler}>
              <Typography variant="body1" gutterBottom>
                Random String: {string}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Enter this key to decypher: {cypherKey}
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
