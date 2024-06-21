import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../Dashboard';
import { getUserList } from "../../../services/common/common";
jest.mock('../../../services/common/common', () => ({
  getUserList: jest.fn(),
}));

test('renders correct number of users', async () => {
  getUserList.mockResolvedValueOnce({ results: [{ id: 1, full_name: 'John Doe', email: 'john@example.com', mobile_number: '123-456-7890' }] });

  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );
  await waitFor(() => {
    const userCards = screen.getAllByTestId(/user-card-/i);
    expect(userCards.length).toBe(1);
  });
});

test('clicking edit button triggers handleEdit function with correct user', async () => {
  getUserList.mockResolvedValueOnce({ results: [{ id: 1, full_name: 'John Doe', email: 'john@example.com', mobile_number: '123-456-7890' }] });

  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );
  await waitFor(() => {
    const editButton = screen.getByTestId('edit-button-1');
    // eslint-disable-next-line testing-library/no-wait-for-side-effects
    fireEvent.click(editButton);
    // Add assertion for handleEdit function triggering with correct user
  });
});



