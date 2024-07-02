import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://g3uez99le1.execute-api.us-east-1.amazonaws.com/test/signup",
        { username, name, email, password, role }
      );
      localStorage.setItem("username", username);
      console.log("Signup Response", response);
      if (response.status === 200) {
        navigate("/confirm/signup");
      }
    } catch (error) {
      console.log("Error", error);
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
          padding: 2,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "background.paper",
          borderColor: "primary.main",
          borderWidth: 1,
          borderStyle: "solid",
          maxHeight: "80vh",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: 0,
          }, // hide scrollbar
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Signup
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="dense"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{
              marginBottom: 1,
              "& .MuiInputLabel-root": {
                fontSize: 14, // reduced label font size
              },
              "& .MuiInputBase-root": {
                fontSize: 14, // reduced input font size
              },
            }}
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="dense"
            placeholder="Enter your email address as username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{
              marginBottom: 1,
              "& .MuiInputLabel-root": {
                fontSize: 14,
              },
              "& .MuiInputBase-root": {
                fontSize: 14,
              },
            }}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="dense"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              marginBottom: 1,
              "& .MuiInputLabel-root": {
                fontSize: 14,
              },
              "& .MuiInputBase-root": {
                fontSize: 14,
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="dense"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              marginBottom: 1,
              "& .MuiInputLabel-root": {
                fontSize: 14,
              },
              "& .MuiInputBase-root": {
                fontSize: 14,
              },
            }}
          />
          <FormControl variant="outlined" fullWidth margin="dense">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
              sx={{
                marginBottom: 1,
                "& .MuiInputLabel-root": {
                  fontSize: 14,
                },
                "& .MuiSelect-root": {
                  fontSize: 14,
                },
              }}
            >
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="PropertyAgent">Property Agent</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: 1,
              padding: 0.5,
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
              fontSize: 14, // reduced button font size
            }}
          >
            Signup
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Signup;
