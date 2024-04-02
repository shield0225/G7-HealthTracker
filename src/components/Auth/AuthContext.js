import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useApolloClient } from "@apollo/client";
import { LOGIN_MUTATION } from "../Utils/graphQLService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userType, setUserType] = useState(null);

  const client = useApolloClient();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsLoggedIn(true);
        setUserType(decoded.userType);
      } catch (error) {
        console.log("Error decoding the token: ", error);
      }
    }
  }, []);

  const login = async (formData) => {
    try {
      const { data } = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: formData,
      });
      localStorage.setItem("token", data.login.token);
      const decoded = jwtDecode(data.login.token);
      setIsLoggedIn(true);
      setUserType(decoded.userType);
      console.log("User type: ", decoded.userType);
      return decoded.userType;
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
