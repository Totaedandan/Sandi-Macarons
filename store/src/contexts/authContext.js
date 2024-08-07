import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const adminLogin = 'sandi';
  const adminPassword = '123qwe45rt!';

  const login = (userData) => {
    setUser(userData);
  };

  const handleLogin = (userLogin, userPassword) => {
    console.log(userLogin, userPassword);

    if (userLogin === adminLogin && userPassword === adminPassword) {
        setUser({ login: userLogin });
    } else {
        alert('Invalid login or password');
    }
};

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
