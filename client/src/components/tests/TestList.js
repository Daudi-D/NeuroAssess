import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TestList = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await axios.get('/api/tests');
        setTests(res.data);
      } catch (error) {
        console.error('Error fetching tests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Available Tests
      </Typography>
      <List>
        {tests.map((test) => (
          <ListItem key={test._id}>
            <ListItemText primary={test.title} secondary={test.description} />
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/take-test/${test._id}`}
            >
              Take Test
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TestList;