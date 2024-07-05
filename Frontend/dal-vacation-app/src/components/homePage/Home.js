import React from 'react';
import { Container, Grid, Typography } from '@mui/material';

const Home = () => {
  return (
    <Container>
      <Grid 
        container 
        spacing={4} 
        alignItems="center" 
        justifyContent="center" 
        sx={{
          minHeight: 'calc(100vh - 64px)', // Adjust based on your app's header/footer height
          width: '100%',
        }}
      >
        <Grid item xs={12} md={6}>
          <img 
            src="https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Photo by Thorsten technoman from Pexels" 
            style={{ width: '100%', height: 'auto' }} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Welcome to DalVacationHome!
          </Typography>
          <Typography variant="body1">
            Discover your perfect getaway with DalVacationHome. Explore our wide selection of unique vacation rentals and plan your dream vacation today.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
