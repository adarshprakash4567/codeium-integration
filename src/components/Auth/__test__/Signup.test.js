import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Signup from '../SignUp'; // Adjust the import path as necessary
import { signup } from '../../../services/common/common'; // Adjust the import path as necessary
import { MemoryRouter, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from '../../../utils/AuthContext';
// Mock the signup API
jest.mock('../../../services/common/common', () => ({
  signup: jest.fn(),
}));



describe('Signup Component', () => {
  beforeEach(() => {
    signup.mockClear();
  });

  const renderSignup = () => {
    render(
      <Router>
        <Signup />
      </Router>
    );
  };

  test('submits form with correct data', async () => {
    renderSignup();

    fireEvent.change(screen.getByTestId('full-name-input'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByTestId('mobile-number-input'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'Password1!' } });
    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    fireEvent.change(screen.getByTestId('profile-image-input'), { target: { files: [file] } });

    signup.mockResolvedValue({ status: 200 });


      fireEvent.click(screen.getByTestId('signup-submit-button'));
 

    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith(expect.objectContaining({
        full_name: 'John Doe',
        email: 'john.doe@example.com',
        mobile_number: '1234567890',
        password: 'Password1!',
        profile_image: file,
      }));
    });
  });

  test('handles error on form submission', async () => {
    renderSignup();

    signup.mockRejectedValue({ response: { data: { error: 'Invalid credentials. Please try again.' } } });


      fireEvent.click(screen.getByTestId('signup-submit-button'));
 

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials. Please try again.')).toBeInTheDocument();
    });
  });
  test('displays error message on failed signup', async () => {
    renderSignup();

    fireEvent.change(screen.getByTestId('full-name-input'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByTestId('mobile-number-input'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'Password1!' } });
    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    fireEvent.change(screen.getByTestId('profile-image-input'), { target: { files: [file] } });

    const errorResponse = { response: { data: { email: 'Email already in use' } } };
    signup.mockRejectedValue(errorResponse);

  
      fireEvent.click(screen.getByTestId('signup-submit-button'));


    await waitFor(() => {
      expect(screen.getByTestId('signup-error')).toHaveTextContent('Email already in use');
    });
  });
  test('route to Sign up', async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/signup" element={<div>Sign Up Page</div>} /> {/* Mock signup route */}
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    const nav = screen.getByTestId('goBack');
    expect(nav).toBeInTheDocument();
    fireEvent.click(nav);
    // await waitFor(() => {
    //   expect(mockedUsedNavigate).toHaveBeenCalledWith('/signup');
    // });
  });

});

