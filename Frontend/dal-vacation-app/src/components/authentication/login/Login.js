import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
import AWS from "aws-sdk";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const auth = () => {
    const poolData = {
      UserPoolId: "us-east-1_x1sxS2NLA",
      ClientId: "3asm0dioqbmn32lh0vie0lcecb",
    };

    const userPool = new CognitoUserPool(poolData);

    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log("Access token: " + result.getAccessToken().getJwtToken());
        localStorage.setItem("accessToken", result.getAccessToken().getJwtToken());
      },
      onFailure: (err) => {
        console.log(err);
        alert("Incorrect Username")
      },
    });
  };

  const session = () => {
    AWS.config.update({
      region: "us-east-1", // Your AWS region here
    });
    const cognitoISP = new AWS.CognitoIdentityServiceProvider();

    // Get user session details
    cognitoISP.getUser(
      {
        AccessToken:
          localStorage.getItem("accessToken")
      },
      (err, data) => {
        if (err) {
          console.error("Error getting user details:", err);
        } else {
          console.log("User session details:", data);
        }
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!username) {
      setUsernameError("Username cannot be empty.");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password cannot be empty.");
      valid = false;
    }

    if (!valid) return;

    try {
      auth();
      // const response = await axios.post(
      //   process.env.REACT_APP_LOGIN_URL,
      //   {
      //     username,
      //     password
      //   }
      // );
      // console.log("Login Response", response);
      // if (response.data.statusCode === 200) {
      //   navigate("/login/security-question");
      //   localStorage.setItem("loggedIn", true);
      // }
    } catch (error) {
      console.log("Error", error);
      setLoginError("Login failed. Please check your username and password.");
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value) {
      setUsernameError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value) {
      setPasswordError("");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Login
        </Typography>
        {loginError && (
          <Typography color="error" gutterBottom>
            {loginError}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={handleUsernameChange}
            error={Boolean(usernameError)}
            helperText={usernameError}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={handlePasswordChange}
            error={Boolean(passwordError)}
            helperText={passwordError}
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2, padding: 1 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
