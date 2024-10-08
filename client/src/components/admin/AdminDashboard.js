import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@material-ui/core';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import TestForm from './TestForm';

const AdminDashboard = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const res = await axios.get('/api/tests');
      setTests(res.data.tests);
    } catch (error) {
      console.error('Error fetching tests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTest = () => {
    setEditingTest(null);
    setOpenDialog(true);
  };

  const handleEditTest = (test) => {
    setEditingTest(test);
    setOpenDialog(true);
  };

  const handleDeleteTest = async (id) => {
    try {
      await axios.delete(`/api/tests/${id}`);
      fetchTests();
    } catch (error) {
      console.error('Error deleting test:', error);
    }
  };

  const handleSaveTest = async (testData) => {
    try {
      if (editingTest) {
        await axios.put(`/api/tests/${editingTest._id}`, testData);
      } else {
        await axios.post('/api/tests', testData);
      }
      setOpenDialog(false);
      fetchTests();
    } catch (error) {
      console.error('Error saving test:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (user.role !== 'admin') {
    return <Typography>Access denied. Admin privileges required.</Typography>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleCreateTest}
        style={{ marginBottom: '1rem' }}
      >
        Create New Test
      </Button>
      <List>
        {tests.map((test) => (
          <ListItem key={test._id}>
            <ListItemText primary={test.title} secondary={`Questions: ${test.questions.length}`} />
            <ListItemSecondaryAction>
              <IconButton color="primary" onClick={() => handleEditTest(test)}>
                <EditIcon />
              </IconButton>
              <IconButton color="secondary" onClick={() => handleDeleteTest(test._id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editingTest ? 'Edit Test' : 'Create New Test'}</DialogTitle>
        <DialogContent>
          <TestForm test={editingTest} onSave={handleSaveTest} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;