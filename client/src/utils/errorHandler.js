import { useSnackbar } from 'notistack';

export const useErrorHandler = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleError = (error) => {
    console.error('Error:', error);

    let errorMessage = 'An unexpected error occurred. Please try again.';

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      errorMessage = error.response.data.message || error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = 'No response received from server. Please check your internet connection.';
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = error.message;
    }

    enqueueSnackbar(errorMessage, { variant: 'error' });
  };

  return handleError;
};