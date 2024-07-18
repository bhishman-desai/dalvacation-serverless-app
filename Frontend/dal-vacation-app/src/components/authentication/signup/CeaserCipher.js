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
import LoaderComponent from "../../utils/loader";

const CeaserCipher = () => {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('userId');
  const userEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();
  console.log(userEmail)

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        process.env.REACT_APP_SIGNUP_CEASER_CYPHER,
        { id: parseInt(userId), key }
      );
      console.log("Cypher: ", response);
      
      const confirmUser = await axios.post("https://jmwefvfgih.execute-api.us-east-1.amazonaws.com/DalVacation/auth/confirmUser", {
        username: userEmail
      })
      
      console.log("Confirm User: ", confirmUser);
      setLoading(false);
      if(confirmUser.data.statusCode === 200) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    {loading ? (<LoaderComponent/>) : (<Container maxWidth="sm">
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
    </Container>)}
    </>
  );
};

export default CeaserCipher;
