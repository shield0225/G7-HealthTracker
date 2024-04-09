import "./App.css";
import { AuthProvider } from "./components/Auth/AuthContext";
import { ApolloProvider } from "@apollo/client";
import client from "./components/Utils/apolloClient";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Home from "./components/Home";
import Patient from "./components/Patient/Patient";
import Nurse from "./components/Nurse/Nurse";
import Personal from "./components/Patient/Personal";
import Stats from "./components/Patient/Stats";
import Users from "./components/Users/Users";
import TeamPage from "./components/TeamPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Container>
      <ApolloProvider client={client}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="personal" element={<Personal />} />
              <Route path="stats" element={<Stats />} />
              <Route path="users" element={<Users />} />
              <Route path="teampage" element={<TeamPage />} />
              <Route
                path="patient"
                element={
                  <ProtectedRoute allowedRoles={["patient"]}>
                    <Patient />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/nurse"
                element={
                  <ProtectedRoute allowedRoles={["nurse"]}>
                    <Nurse />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </AuthProvider>
      </ApolloProvider>
    </Container>
  );
}

export default App;
