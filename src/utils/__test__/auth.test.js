import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import isAuthenticated from '../auth';

describe('isAuthenticated', () => {
  test('returns true when token is present in localStorage', () => {
    Object.defineProperty(window, 'localStorage', {
      value: new MockLocalStorage(),
    });
    localStorage.setItem('token', 'test-token');
    expect(isAuthenticated()).toBe(true);
  });

  test('returns false when token is not present in localStorage', () => {
    Object.defineProperty(window, 'localStorage', {
      value: new MockLocalStorage(),
    });
    expect(isAuthenticated()).toBe(false);
  });

  test('returns false when localStorage is not available', () => {
    expect(isAuthenticated()).toBe(false);
  });
});

class MockLocalStorage {
  constructor() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value;
  }

  removeItem(key) {
    delete this.store[key];
  }
}