import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import EditUser from '../ EditUser';
import { EditUserDetail } from '../../../services/common/common';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../../../services/common/common', () => ({
  EditUserDetail: jest.fn(),
}));

describe('EditUser Component', () => {
  const mockUser = {
    id: '1',
    full_name: 'John Doe',
    email: 'john.doe@example.com',
    mobile_number: '1234567890',
    profile_image: 'http://example.com/image.jpg',
  };

  const renderComponent = (role = 'User') => {
    localStorage.setItem('role', role);
    render(
      <MemoryRouter initialEntries={[{ pathname: '/edit-user', state: { user: mockUser } }]}>
        <Routes>
          <Route path="/edit-user" element={<EditUser />} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders form fields correctly', () => {
    renderComponent();

    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-number-input')).toBeInTheDocument();
    expect(screen.getByTestId('profile-image-input')).toBeInTheDocument();
    expect(screen.getByTestId('save-button')).toBeInTheDocument();
  });

  it('sets default values and disables email field for users', () => {
    renderComponent();

    expect(screen.getByTestId('name-input')).toHaveValue(mockUser.full_name);
    expect(screen.getByTestId('email-input')).toHaveValue(mockUser.email);
    expect(screen.getByTestId('mobile-number-input')).toHaveValue(mockUser.mobile_number);
    expect(screen.getByTestId('email-input')).toBeDisabled();
  });

  it('shows validation errors for invalid inputs', async () => {
    renderComponent();

    fireEvent.input(screen.getByTestId('name-input'), { target: { value: '' } });
    fireEvent.input(screen.getByTestId('mobile-number-input'), { target: { value: '123' } });
    fireEvent.submit(screen.getByTestId('edit-user-form'));

    await waitFor(() => {
      expect(screen.getByTestId('name-error')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByTestId('mobile-number-error')).toBeInTheDocument();
    });
  });

  it('submits form successfully with valid inputs', async () => {
    EditUserDetail.mockResolvedValue({ message: 'Fields updated successfully' });

    renderComponent('Admin');

    fireEvent.input(screen.getByTestId('name-input'), { target: { value: 'Jane Doe' } });
    fireEvent.input(screen.getByTestId('email-input'), { target: { value: 'jane.doe@example.com' } });
    fireEvent.input(screen.getByTestId('mobile-number-input'), { target: { value: '0987654321' } });
    fireEvent.submit(screen.getByTestId('edit-user-form'));

    await waitFor(() => {
      expect(EditUserDetail).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(toast.success).toHaveBeenCalledWith('User details edited successfully.');
    });
  });

  it('updates profile image on upload', async () => {
    renderComponent();

    const file = new File(['image'], 'image.png', { type: 'image/png' });
    const fileInput = screen.getByTestId('profile-image-input');

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByTestId('profile-image')).toHaveAttribute('src', expect.stringContaining('blob:'));
    });
  });
});
