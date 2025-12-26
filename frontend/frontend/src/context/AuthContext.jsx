import { useState, useEffect } from 'react';
import { AuthContext } from './authContextValue';
import { getToken, getUser, saveAuthData, clearAuthData } from '../utils/authStorage';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = getToken();
    const userData = getUser();

    if (token && userData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(userData);
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData, token) => {
    saveAuthData(userData, token);
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    clearAuthData();
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    getToken,
    isAuthenticated: !!user,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};