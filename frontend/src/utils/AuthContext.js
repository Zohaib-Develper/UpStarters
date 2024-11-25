import React, { createContext, useState, useContext } from "react";

// Create Auth Context
const AuthContext = createContext();

const getUser = () => {
  const savedUser = localStorage.getItem("user");

  if (savedUser) {
    return JSON.parse(savedUser);
  } else {
    return null;
  }
};
// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser);

  // Log in function
  const login = (userData) => {
    setUser(userData); // Set the user data (e.g., after API response)
    localStorage.setItem("user", JSON.stringify(userData)); // Persist user state
  };

  // Log out function
  const logout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem("user"); // Remove persisted state
  };

  // Initialize user from localStorage on app load
  React.useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};
