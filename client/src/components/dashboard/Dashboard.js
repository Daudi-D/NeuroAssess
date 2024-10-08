import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography, Button, Grid, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tests, setTests] = useState([]);
  const [results, setResults] = useState([]);
  const [performanceTrend, setPerformanceTrend] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const testsRes = await axios.get('/api/tests');
        setTests(testsRes.data.tests);

        const resultsRes = await axios.get('/api/results');
        setResults(resultsRes.data.results);

        const trendRes = await axios.get('/api/results/trend');
        setPerformanceTrend(trendRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: results.map(result => result.test.title),
    datasets: [
      {
        label: 'Test Scores',
        data: results.map(result => result.score),
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const trendData = {
    labels: performanceTrend.map(point => point.date),
    datasets: [
      {
        label: 'Performance Trend',
        data: performanceTrend.map(point => point.averageScore),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user.name}!
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '1rem' }}>
            <Typography variant="h6" gutterBottom>
              Available Tests
            </Typography>
            {tests.map(test => (
              <Button
                key={test._id}
                variant="contained"
                color="primary"
                fullWidth
                component={Link}
                to={`/take-test/${test._id}`}
                style={{ marginBottom: '0.5rem' }}
              >
                {test.title}
              </Button>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '1rem' }}>
            <Typography variant="h6" gutterBottom>
              Your Results
            </Typography>
            <Bar
              data={chartData}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                  },
                },
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ padding: '1rem' }}>
            <Typography variant="h6" gutterBottom>
              Performance Trend
            </Typography>
            <Line
              data={trendData}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                  },
                },
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;