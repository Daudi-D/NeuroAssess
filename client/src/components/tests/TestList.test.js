import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import TestList from './TestList';

jest.mock('axios');

const mockTests = [
  { _id: '1', title: 'Test 1', description: 'Description 1' },
  { _id: '2', title: 'Test 2', description: 'Description 2' },
];

describe('TestList Component', () => {
  it('renders loading state initially', () => {
    render(
      <Router>
        <TestList />
      </Router>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders list of tests after loading', async () => {
    axios.get.mockResolvedValue({ data: mockTests });

    render(
      <Router>
        <TestList />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Test 1')).toBeInTheDocument();
      expect(screen.getByText('Test 2')).toBeInTheDocument();
    });
  });

  it('renders error message when API call fails', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));

    render(
      <Router>
        <TestList />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Error fetching tests')).toBeInTheDocument();
    });
  });
});