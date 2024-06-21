/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-wait-for-side-effects */
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Home from '../Home';
import { getUserDetails } from '../../../services/common/common';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock('../../../services/common/common', () => ({
  getUserDetails: jest.fn(),
}));

const user = {
  id: 1,
  full_name: 'John Doe',
  email: 'john.doe@example.com',
  mobile_number: '1234567890',
  profile_image: 'http://example.com/image.jpg',
};

beforeEach(() => {
  getUserDetails.mockResolvedValue(user);
});

describe('Home', () => {
  const navigateMock = jest.fn();

  beforeEach(() => {
    navigateMock.mockClear();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigateMock);
  });

  it('should render the profile image', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      const profileImage = screen.getByTestId('profile-image');
      expect(profileImage).toBeInTheDocument();
      expect(profileImage).toHaveAttribute('src', user.profile_image);
    });
  });

  it('should render the user details', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      const fullNameInput = screen.getByTestId('full-name-input');
      const emailInput = screen.getByTestId('email-input');
      const mobileNumberInput = screen.getByTestId('mobile-number-input');

      expect(fullNameInput).toHaveValue(user.full_name);
      expect(emailInput).toHaveValue(user.email);
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(mobileNumberInput).toHaveValue(user.mobile_number);
    });
  });

  it('should navigate to the edit page when the edit button is clicked', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      const editButton = screen.getByTestId('edit-button');
      userEvent.click(editButton);

      expect(navigateMock).toHaveBeenCalledWith(`/user/edit-user/${user.id}`, { state: { user } });
    });
  });
});
