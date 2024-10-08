import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Typography, TextField, Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      enqueueSnackbar('Passwords do not match', { variant: 'error' });
      return;
    }
    try {
      await axios.post('/api/auth/reset-password', { token, newPassword: password });
      enqueueSnackbar('Password reset successful. You can now log in with your new password.', { variant: 'success' });
      history.push('/login');
    } catch (error) {
      enqueueSnackbar(error.response.data.msg || 'Error resetting password', { variant: 'error' });
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Reset Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="New Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm New Password"
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '1rem' }}
        >
          Reset Password
        </Button>
      </form>
    </Container>
  );
};

export default ResetPassword;