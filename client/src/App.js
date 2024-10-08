import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/routing/PrivateRoute';
import ErrorBoundary from './components/common/ErrorBoundary';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import TestList from './components/tests/TestList';
import TestTake from './components/tests/TestTake';
import ResultView from './components/results/ResultView';
import AdminDashboard from './components/admin/AdminDashboard';
import UserProfile from './components/user/UserProfile';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';

let theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

theme = responsiveFontSizes(theme);

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider maxSnack={3}>
            <Router>
              <Navbar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/reset-password/:token" component={ResetPassword} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/tests" component={TestList} />
                <PrivateRoute path="/take-test/:id" component={TestTake} />
                <PrivateRoute path="/results/:id" component={ResultView} />
                <PrivateRoute path="/admin" component={AdminDashboard} />
                <PrivateRoute path="/profile" component={UserProfile} />
              </Switch>
            </Router>
          </SnackbarProvider>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;