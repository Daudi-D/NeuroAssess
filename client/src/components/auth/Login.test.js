import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Login from './Login';

const mockLogin = jest.fn();

const renderLogin = () => {
  return render(
    <Router>
      <AuthContext.Provider value={{ login: mockLogin }}>
        <Login />
      </AuthContext.Provider>
    </Router>
  );
};

describe('Login Component', () => {
  it('renders login form', () => {
    const { getByLabelText, getByText } = renderLogin();
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
  });

  it('submits form with user input', async () => {
    const { getByLabelText, getByText } = renderLogin();
    
    fireEvent.change(getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('displays error message on login failure', async () => {
    mockLogin.mockImplementationOnce(() => false);
    const { getByLabelText, getByText } = renderLogin();

    fireEvent.change(getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'wrongpassword' } });
    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      expect(getByText('Invalid email or password')).toBeInTheDocument();
    });
  });
});