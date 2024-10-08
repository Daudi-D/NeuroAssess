import React from 'react';
import { Typography, Button } from '@material-ui/core';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Typography variant="h5" gutterBottom>
            Oops! Something went wrong.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;