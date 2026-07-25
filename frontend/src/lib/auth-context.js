'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial dark mode preference
    const isDark = localStorage.getItem('healthbd_theme') === 'dark' || 
      (!('healthbd_theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Load stored user session
    const storedUser = localStorage.getItem('healthbd_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user session:', e);
      }
    }
    setLoading(false);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const nextTheme = !prev;
      if (nextTheme) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('healthbd_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('healthbd_theme', 'light');
      }
      return nextTheme;
    });
  };

  const loginWithGoogle = async () => {
    const googleUser = {
      id: 'usr_g_' + Math.random().toString(36).substring(2, 9),
      name: 'Tanvir Ahmed',
      email: 'tanvir.ahmed@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      provider: 'google'
    };
    setUser(googleUser);
    localStorage.setItem('healthbd_user', JSON.stringify(googleUser));
    return googleUser;
  };

  const loginWithEmail = async (email, password) => {
    const emailUser = {
      id: 'usr_e_' + Math.random().toString(36).substring(2, 9),
      name: email.split('@')[0],
      email: email,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      provider: 'email'
    };
    setUser(emailUser);
    localStorage.setItem('healthbd_user', JSON.stringify(emailUser));
    return emailUser;
  };

  const registerWithEmail = async (name, email, password) => {
    const newUser = {
      id: 'usr_e_' + Math.random().toString(36).substring(2, 9),
      name: name,
      email: email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      provider: 'email'
    };
    setUser(newUser);
    localStorage.setItem('healthbd_user', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('healthbd_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, isDarkMode, toggleTheme, loginWithGoogle, loginWithEmail, registerWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
