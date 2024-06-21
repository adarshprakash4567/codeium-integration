import { getRoleById, roles } from '../roles';

test('should return correct role for valid id', () => {
  const id = 1;
  const expectedRole = 'Admin';
  const result = getRoleById(id);
  expect(result).toBe(expectedRole);
});

test('should return "Invalid role" for invalid id', () => {
  const id = 2;
  const expectedRole = 'Invalid role';
  const result = getRoleById(id);
  expect(result).toBe(expectedRole);
});