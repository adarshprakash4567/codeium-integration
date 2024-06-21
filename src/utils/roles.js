import React from 'react'

export const roles = [
  { id: 0, role: 'User' },
  { id: 1, role: 'Admin' },
]

export const getRoleById = (id) => {
  const role = roles.find(role => role.id === id);
  return role ? role.role : 'Invalid role';
}

