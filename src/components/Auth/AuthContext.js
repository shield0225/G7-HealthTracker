import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import client from "../../Utils/apolloClient";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { LOGIN_MUTATION, GET_USER } from "../../Utils/graphQLService";

const AuthContext = createContext();
console.log(client);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userType, setUserType] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const login = async (formData) => {
    setError(null); // Reset error state before new login attempt
    try {
      const { data } = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: formData,
      });
      if (data && data.login && data.login.token) {
        localStorage.setItem("token", data.login.token);
        console.log("Login successful, token stored.");
        const decoded = jwtDecode(data.login.token);
        setIsLoggedIn(true);
        setUserType(decoded.userType);
        fetchUserDetails();
        console.log("User type: ", decoded.userType);
      } else {
        console.error("Login failed: Token not received.");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserType(null);
    setUserDetails(null);
    navigate("/");
    client.resetStore()
    console.log("Logged out.");
  }, [navigate]);

  const fetchUserDetails = () => {
    return new Promise(async (resolve, reject) => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const { data } = await client.query({
            query: GET_USER,
          });
          setUserDetails(data.me);
          resolve(data.me);
        } catch (error) {
          console.error("Error fetching user details: ", error);
          reject(error); 
        }
      } else {
        reject("Token not found"); 
      }
    });
  };
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsLoggedIn(true);
        setUserType(decoded.userType);
        fetchUserDetails();
      } catch (error) {
        console.log("Error decoding the token: ", error);
        logout();
      }
    }
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userType, userDetails, login, logout, fetchUserDetails }}
    >

      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
