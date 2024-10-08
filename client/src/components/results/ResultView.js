import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { Radar } from 'react-chartjs-2';

const ResultView = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axios.get(`/api/results/${id}`);
        setResult(res.data);
      } catch (error) {
        console.error('Error fetching result:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!result) {
    return <Typography>Result not found</Typography>;
  }

  const chartData = {
    labels: result.categories.map(category => category.name),
    datasets: [
      {
        label: 'Your Score',
        data: result.categories.map(category => category.score),
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: 'rgba(75,192,192,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const chartOptions = {
    scale: {
      ticks: { beginAtZero: true, max: 100 },
    },
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Test Result: {result.testTitle}
      </Typography>
      <Paper style={{ padding: '2rem' }}>
        <Typography variant="h5" gutterBottom>
          Overall Score: {result.overallScore}%
        </Typography>
        <Radar data={chartData} options={chartOptions} />
        <Typography variant="h6" style={{ marginTop: '2rem' }}>
          Feedback
        </Typography>
        <Typography variant="body1" paragraph>
          {result.feedback}
        </Typography>
      </Paper>
    </Container>
  );
};

export default ResultView;