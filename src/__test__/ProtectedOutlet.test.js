import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProtectedOutletComponent from '../ProtectedOutletComponent';
import Header from '../layout/Header';
import { useLocation } from 'react-router-dom';

// Mock components and hooks
jest.mock('../layout/Header', () => () => <div>Header</div>);
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  Outlet: () => <div>Outlet</div>,
  Navigate: jest.fn(({ to }) => <div>Navigate to {to}</div>),
}));

describe('ProtectedOutletComponent', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders Header and Outlet when authenticated', () => {
    localStorage.setItem('token', 'fake-token');
    render(
      <MemoryRouter>
        <ProtectedOutletComponent />
      </MemoryRouter>
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Outlet')).toBeInTheDocument();
  });

  it('navigates to home page when not authenticated', () => {
    render(
      <MemoryRouter>
        <ProtectedOutletComponent />
      </MemoryRouter>
    );

    expect(screen.getByText('Navigate to /')).toBeInTheDocument();
  });

  it('uses the useLocation hook', () => {
    const mockLocation = { pathname: '/test' };
    useLocation.mockReturnValue(mockLocation);

    render(
      <MemoryRouter>
        <ProtectedOutletComponent />
      </MemoryRouter>
    );

    expect(useLocation).toHaveBeenCalled();
  });
});
