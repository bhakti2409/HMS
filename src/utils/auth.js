// All login / localStorage helpers live here so every component uses the same keys.
import defaultUsers from '../data/users';

const LOGGED_IN_KEY = 'loggedInUser';
const REGISTERED_KEY = 'registeredUsers';

// default users + users who registered through the Register page
export const getAllUsers = () => {
  const registered = JSON.parse(localStorage.getItem(REGISTERED_KEY)) || [];
  return [...defaultUsers, ...registered];
};

export const registerUser = (newUser) => {
  const registered = JSON.parse(localStorage.getItem(REGISTERED_KEY)) || [];
  localStorage.setItem(REGISTERED_KEY, JSON.stringify([...registered, newUser]));
};

export const getLoggedInUser = () => {
  try {
    return JSON.parse(localStorage.getItem(LOGGED_IN_KEY));
  } catch (e) {
    return null;
  }
};

export const saveLoggedInUser = (user) => {
  // never keep the password in localStorage
  const { password, ...safeUser } = user;
  localStorage.setItem(LOGGED_IN_KEY, JSON.stringify(safeUser));
};

export const logoutUser = () => localStorage.removeItem(LOGGED_IN_KEY);

// role -> home page after login
export const getHomePath = (role) => {
  if (role === 'ADMIN') return '/admin/dashboard';
  if (role === 'DOCTOR') return '/doctor/dashboard';
  return '/patient/dashboard';
};
