import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Container, Typography, Button } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Alert } from '@material-ui/lab';
import { AuthContext } from '../../context/AuthContext';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const { login } = useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    setError(null);
    const success = await login(values.email, values.password);
    if (success) {
      history.push('/dashboard');
    } else {
      setError('Invalid email or password');
    }
    setSubmitting(false);
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              style={{ marginTop: '1rem' }}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;