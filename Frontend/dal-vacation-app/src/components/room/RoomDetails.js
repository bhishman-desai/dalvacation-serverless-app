import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";

const RoomDetails = () => {
  const location = useLocation();
  const { room } = location.state;
  const [bookingDetails, setBookingDetails] = useState({
    startDate: "",
    endDate: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleBookRoom = () => {
    fetch(
      "https://fxprribn4j2ifrtme6oe2xm4hu0wimtc.lambda-url.us-east-1.on.aws/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...bookingDetails,
          roomId: room.roomId,
          userId: localStorage.getItem("userId"),
          username: localStorage.getItem("userEmail"),
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        alert("Room booked successfully!");
      })
      .catch((error) => console.error("Error booking room:", error));
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom>
            Room Details
          </Typography>
          <Typography variant="h6">Type: {room.type}</Typography>
          <Typography>Price: ${room.price} per night</Typography>
          <Typography>Features: {room.features.join(", ")}</Typography>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleBookRoom();
            }}
            sx={{ mt: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Start Date"
                  name="startDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={bookingDetails.startDate}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="End Date"
                  name="endDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={bookingDetails.endDate}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Book Room
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RoomDetails;