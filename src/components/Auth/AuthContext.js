import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";
import client from "../../Utils/apolloClient";
import { LOGIN_MUTATION, GET_USER } from "../../Utils/graphQLService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
console.log(client);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userType, setUserType] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserType(null);
    setUserDetails(null);
    navigate("/login");
    console.log("Logged out.");
  }, [navigate]);

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { data } = await client.query({
          query: GET_USER,
        });
        setUserDetails(data.me);
        console.log("User details fetched: ", data.me);
      } catch (error) {
        console.error("Error fetching user details: ", error);
      }
    }
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

  const login = async (formData) => {
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

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userType, userDetails, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
