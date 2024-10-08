import React from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem', textAlign: 'center' }}>
      <Typography variant="h2" gutterBottom>
        Welcome to Psychometric Testing
      </Typography>
      <Typography variant="body1" paragraph>
        Discover your potential with our advanced psychometric tests. Whether you're an employer looking to assess candidates or an individual seeking personal insights, we've got you covered.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/register">
        Get Started
      </Button>
    </Container>
  );
};

export default Home;