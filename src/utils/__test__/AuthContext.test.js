import { renderHook, act } from '@testing-library/react-hooks';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AuthProvider, AuthContext } from './AuthContext';
import { useContext } from 'react';

test('should set role and navigate to admin dashboard when loginAsAdmin is called', () => {
  const history = createMemoryHistory();
  const { result } = renderHook(() => useContext(AuthContext), {
    wrapper: ({ children }) => (
      <Router history={history}>
        <AuthProvider>{children}</AuthProvider>
      </Router>
    ),
  });

  act(() => {
    result.current.loginAsAdmin(history.push);
  });

  expect(result.current.role).toBe('Admin');
  expect(history.location.pathname).toBe('/admin/dashboard');
});

test('should set role and navigate to user dashboard when loginAsUser is called', () => {
  const history = createMemoryHistory();
  const { result } = renderHook(() => useContext(AuthContext), {
    wrapper: ({ children }) => (
      <Router history={history}>
        <AuthProvider>{children}</AuthProvider>
      </Router>
    ),
  });

  act(() => {
    result.current.loginAsUser(history.push);
  });

  expect(result.current.role).toBe('User');
  expect(history.location.pathname).toBe('/user/dashboard');
});

test('should logout and clear localStorage when logout is called', () => {
  const history = createMemoryHistory();
  const { result } = renderHook(() => useContext(AuthContext), {
    wrapper: ({ children }) => (
      <Router history={history}>
        <AuthProvider>{children}</AuthProvider>
      </Router>
    ),
  });

  act(() => {
    result.current.logout(history.push);
  });

  expect(result.current.role).toBe(null);
  expect(history.location.pathname).toBe('/');
  expect(localStorage.getItem('role')).toBe(null);
});