import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/forgot-password', { email });
      enqueueSnackbar('Password reset email sent. Please check your inbox.', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.response.data.msg || 'Error sending reset email', { variant: 'error' });
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '1rem' }}
        >
          Send Reset Email
        </Button>
      </form>
    </Container>
  );
};

export default ForgotPassword;