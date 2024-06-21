import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import PasswordChangeComponent from '../ChangePassword';
import { EditPassword } from '../../services/common/common';
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('../../services/common/common', () => ({
  EditPassword: jest.fn(),
}));
jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}));
jest.mock('@hookform/resolvers/yup', () => ({
  yupResolver: jest.fn(),
}));
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('PasswordChangeComponent', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    useForm.mockReturnValue({
      register: jest.fn(),
      handleSubmit: (fn) => (e) => { e.preventDefault(); fn({
        oldPassword: 'Oldpassword@123',
        newPassword: 'Newpassword@123'
      }); },
      formState: { errors: {} },
    });
    yupResolver.mockReturnValue(jest.fn());
  });

  test('renders correctly', () => {
    render(<PasswordChangeComponent loggedIn={true} UserId={1} />);
    expect(screen.getByTestId('change-password-title')).toBeInTheDocument();
  });

  test('submits form with new password when not logged in', async () => {
    EditPassword.mockResolvedValue({ message: 'Password updated successfully' });
    render(<PasswordChangeComponent loggedIn={false} UserId={1} />);
    
    const newPasswordInput = screen.getByTestId('newPassword');
    fireEvent.change(newPasswordInput, { target: { value: 'Newpassword@123' } });
    
    const submitButton = screen.getByTestId('submit');
    fireEvent.click(submitButton);
    
    await waitFor(() => expect(EditPassword).toHaveBeenCalledWith({
      userid: 1,
      password: 'Newpassword@123',
    }));

    await waitFor(() => expect(toast.success).toHaveBeenCalledWith("Password changed successfully"));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/admin/dashboard'));
  });

  test('submits form with old and new password when logged in', async () => {
    EditPassword.mockResolvedValue({ message: 'Password updated successfully' });
    render(<PasswordChangeComponent loggedIn={true} UserId={1} />);
    
    const oldPasswordInput = screen.getByTestId('oldPassword');
    fireEvent.change(oldPasswordInput, { target: { value: 'Oldpassword@123' } });

    const newPasswordInput = screen.getByTestId('newPassword');
    fireEvent.change(newPasswordInput, { target: { value: 'Newpassword@123' } });

    const submitButton = screen.getByTestId('submit');
    fireEvent.click(submitButton);
    
    await waitFor(() => expect(EditPassword).toHaveBeenCalledWith({
      old_password: 'Oldpassword@123',
      password: 'Newpassword@123',
    }));

    await waitFor(() => expect(toast.success).toHaveBeenCalledWith("Password changed successfully"));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/user/dashboard'));
  });

  test('displays error message when form submission fails', async () => {
    EditPassword.mockRejectedValue({ response: { data: { error: 'Failed to change password' } } });
    render(<PasswordChangeComponent loggedIn={false} UserId={1} />);

    const newPasswordInput = screen.getByTestId('newPassword');
    fireEvent.change(newPasswordInput, { target: { value: 'Newpassword@123' } });
    
    const submitButton = screen.getByTestId('submit');
    fireEvent.click(submitButton);

    await waitFor(() => expect(EditPassword).toHaveBeenCalledWith({
      userid: 1,
      password: 'Newpassword@123',
    }));

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Failed to change password'));
  });
});

