import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CeaserCipher = () => {
  const [key, setKey] = useState("");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_SIGNUP_CEASER_CYPHER,
        { username: username, key }
      );
      console.log("Cypher: ", response);
      if (response.status === 200) {
        navigate("/");
      }

      const confirmUser = await axios.post('https://m21jpbf7qb.execute-api.us-east-1.amazonaws.com/test/confirm-user', {
        username: username
      })

        console.log("Confirm User: ", confirmUser);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        alignItems="center"
        minHeight="60vh"
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Caesar Cypher
          </Typography>
          <form onSubmit={submitHandler}>
            <TextField
              label="Enter a key"
              variant="outlined"
              placeholder="example: 10"
              fullWidth
              margin="normal"
              onChange={(e) => setKey(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={submitHandler}
            >
              Register
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default CeaserCipher;
