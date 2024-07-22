import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, Container } from "@mui/material";

function Reviews({ roomId }) {
  const [reviews, setReviews] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.post(
          "https://d5vbhid2fj.execute-api.us-east-1.amazonaws.com/dal-vacation/looker-get",
          { email: userEmail, roomId },
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("Reviews fetched successfully:", JSON.stringify(response));

        const data = JSON.parse(response.data.body);

        if (data && data.firestoreData) {
          const filteredReviews = data.firestoreData.filter(
            (review) => review.roomDetails.roomId === roomId
          );
          setReviews(filteredReviews);
        } else {
          console.log("No reviews found.");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (userEmail) {
      fetchReviews();
    } else {
      console.error("User email not found in local storage.");
    }
  }, [userEmail, roomId,]);

  const getSentimentPolarity = (sentimentScore) => {
    if (sentimentScore.score > 0) {
      return "Positive";
    } else if (sentimentScore.score < 0) {
      return "Negative";
    } else {
      return "Neutral";
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Reviews
      </Typography>
      <Grid container spacing={2}>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{review.description}</Typography>
                  <Typography color="textSecondary">
                    Username: {review.userDetails.username}
                  </Typography>
                  <Typography color="textSecondary">
                    Polarity: {getSentimentPolarity(review.sentimentScore)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No reviews found for this room.</Typography>
        )}
      </Grid>
    </Container>
  );
}

export default Reviews;
