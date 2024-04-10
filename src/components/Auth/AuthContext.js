import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { useApolloClient } from "@apollo/client";
import { LOGIN_MUTATION } from "../Utils/graphQLService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);
  const [firstName, setfirstName] = useState(null);  
  const [error, setError] = useState(null); // Error state added here

  const client = useApolloClient();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsLoggedIn(true);
        setUserType(decoded.userType);
        setfirstName(decoded.firstName);   
        setUserId(decoded.userId);             
      } catch (error) {
        console.log("Error decoding the token: ", error);
        logout(); // Clear token if invalid
      }
    }
  }, []);

  const login = async (formData) => {
    setError(null); // Reset error state before new login attempt
    try {
      const { data } = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: formData,
      });
      localStorage.setItem("token", data.login.token);
      const decoded = jwtDecode(data.login.token);
      setIsLoggedIn(true);
      setUserType(decoded.userType);
      setUserId(decoded.userId);
      setfirstName(decoded.firstName);              
    } catch (error) {
      const message = error.graphQLErrors?.[0]?.message || 'Invalid Login! Please try again';
      setError ({message}); // Update error state here
      setIsLoggedIn(false); // Set as logged out on error
      console.error("Login error: ", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserType(null);
    setUserId(null);    
    setfirstName(null);
    setError(null); // Reset error on logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, userId, firstName, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
