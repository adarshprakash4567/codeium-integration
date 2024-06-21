import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Login from '../Login';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../../../utils/AuthContext'; // Adjust the path as needed
import { login as mockLogin } from '../../../services/common/common';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('../../../services/common/common', () => ({
  login: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

test('valid email and password should navigate to admin dashboard', async () => {
  mockLogin.mockResolvedValueOnce({
    data: {
      access: 'mocked_token',
      role: 1,
    },
  });

  render(
    <AuthProvider>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/dashboard" element={<div>Admin Dashboard</div>} /> {/* Mock admin dashboard route */}
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );

  const emailInput = screen.getByTestId('Email');
  const passwordInput = screen.getByTestId('Password');
  const submitButton = screen.getByTestId('Login');

  fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'admin' } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/admin/dashboard');
  });
});



test('route to Sign up', async () => {
  render(
    <AuthProvider>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<div>Sign Up Page</div>} /> {/* Mock signup route */}
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );

  const nav = screen.getByTestId('routeToSignUp');
  expect(nav).toBeInTheDocument();
  fireEvent.click(nav);
  await waitFor(() => {
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/signup');
  });
});

test('Password show and hide', async () => {
  render(
    <AuthProvider>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );

  const eyeIcon = screen.getByTestId('eyeIcon');
  expect(eyeIcon).toBeInTheDocument();
  fireEvent.click(eyeIcon);
  fireEvent.click(eyeIcon);
});

test('incorrect password should show error message', async () => {
  mockLogin.mockRejectedValueOnce({
    response: {
      data: { error: 'Invalid credentials. Please try again.' },
    },
  });

  render(
    <AuthProvider>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );

  const emailInput = screen.getByTestId('Email');
  const passwordInput = screen.getByTestId('Password');
  const submitButton = screen.getByTestId('Login');

  fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText('Invalid credentials. Please try again.')).toBeInTheDocument();
  });
});

