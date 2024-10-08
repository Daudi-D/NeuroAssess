import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Container, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Alert } from '@material-ui/lab';
import { AuthContext } from '../../context/AuthContext';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  role: Yup.string().required('Role is required'),
});

const Register = () => {
  const { register } = useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    setError(null);
    try {
      await register(values.name, values.email, values.password, values.role);
      history.push('/dashboard');
    } catch (err) {
      setError(err.response.data.msg || 'Registration failed. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Formik
        initialValues={{ name: '', email: '', password: '', role: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Field
              component={TextField}
              name="name"
              label="Name"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Field
              component={TextField}
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Field
              component={TextField}
              type="password"
              name="password"
              label="Password"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel htmlFor="role">Role</InputLabel>
              <Field
                component={Select}
                name="role"
                inputProps={{
                  id: 'role',
                }}
                label="Role"
              >
                <MenuItem value="employer">Employer</MenuItem>
                <MenuItem value="candidate">Candidate</MenuItem>
              </Field>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              style={{ marginTop: '1rem' }}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Register;