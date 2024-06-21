import React from 'react';
import { render, screen } from '@testing-library/react';
import PageNotFound from '../PageNotFound';

test('renders image with correct URL and alt text', () => {
  render(<PageNotFound />);
  const image = screen.getByAltText('404 - Page Not Found');
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute('src', 'https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?t=st=1718094986~exp=1718098586~hmac=a7ec005b34e38cc8db675eb71cd6655571c451d3f04425fb6eea2848378d29a3&w=1380');
});

test('renders heading "404 - Page Not Found"', () => {
  render(<PageNotFound />);
  const heading = screen.getByText('404 - Page Not Found');
  expect(heading).toBeInTheDocument();
  expect(heading).toHaveClass('text-4xl font-bold');
});

test('renders paragraph text "Oops! The page you are looking for does not exist."', () => {
  render(<PageNotFound />);
  const paragraph = screen.getByText('Oops! The page you are looking for does not exist.');
  expect(paragraph).toBeInTheDocument();
  expect(paragraph).toHaveClass('text-gray-600');
});