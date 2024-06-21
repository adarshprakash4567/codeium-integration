import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RefersFriend from '../ReferFriend';
import { ReferFriend } from '../../services/common/common';

jest.mock('../../services/common/common', () => ({
  ReferFriend: jest.fn(),
}));

beforeEach(() => {
  ReferFriend.mockResolvedValue({ data: { message: 'success' } });
});

describe('RefersFriend', () => {
  const userId = '123';

  test('renders Refer a Friend heading', () => {
    render(<RefersFriend userId={userId} />);
    expect(screen.getByTestId('refer-friend-title')).toHaveTextContent('Refer a Friend');
  });

  test('displays input field with placeholder text', () => {
    render(<RefersFriend userId={userId} />);
    expect(screen.getByPlaceholderText("Enter friend's email")).toBeInTheDocument();
  });

  test('enables submit button when email is entered', () => {
    render(<RefersFriend userId={userId} />);
    const emailInput = screen.getByTestId('email-input');
    const submitButton = screen.getByTestId('refer-button');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(submitButton).toBeEnabled();
  });

  test('submits the form and shows success alert', async () => {
    window.alert = jest.fn(); // Mock window.alert
    render(<RefersFriend userId={userId} />);
    const emailInput = screen.getByTestId('email-input');
    const submitButton = screen.getByTestId('refer-button');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Thanks for referring success!');
    });
  });

  test('disables submit button when input value is empty', () => {
    render(<RefersFriend userId={userId} />);
    expect(screen.getByTestId('refer-button')).toBeDisabled();
  });
});
