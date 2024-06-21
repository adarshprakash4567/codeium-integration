import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Header';
import { useAuth } from '../../utils/AuthContext';

jest.mock('../../utils/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const mockLogout = jest.fn();

beforeEach(() => {
  useAuth.mockReturnValue({
    logout: mockLogout,
  });
  jest.clearAllMocks();
});

test('renders Header component correctly', () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  expect(screen.getByTestId('header')).toBeInTheDocument();
});

test('shows and hides menu on user icon click', () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  const userIcon = screen.getByTestId('user-icon');

  // Initially menu should not be visible
  expect(screen.queryByTestId('logout-button')).not.toBeInTheDocument();

  // Click user icon to show menu
  fireEvent.click(userIcon);
  expect(screen.getByTestId('logout-button')).toBeInTheDocument();

  // Click user icon again to hide menu
  fireEvent.click(userIcon);
  expect(screen.queryByTestId('logout-button')).not.toBeInTheDocument();
});

test('calls logout and navigates on logout button click', () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  const userIcon = screen.getByTestId('user-icon');

  // Click user icon to show menu
  fireEvent.click(userIcon);
  const logoutButton = screen.getByTestId('logout-button');

  // Click logout button
  fireEvent.click(logoutButton);

  // Check if logout function was called with navigate
  expect(mockLogout).toHaveBeenCalledWith(mockedUsedNavigate);
});
