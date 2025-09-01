'use client';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = Cookies.get('token');
  return !!token;
};

// Get logged-in user info from token
export const getUser = () => {
  const token = Cookies.get('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (err) {
    console.error('Invalid token', err);
    return null;
  }
};
