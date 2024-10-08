import React, { useState, useContext, useEffect } from 'react';
import { Container, Typography, TextField, Button, Paper, Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const UserProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('/api/users/profile', { name, email, password });
      setUser(res.data);
      enqueueSnackbar('Profile updated successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.response.data.msg || 'Error updating profile', { variant: 'error' });
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Paper style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="New Password (leave blank to keep current)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Update Profile
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default UserProfile;