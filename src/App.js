import "./App.css";
import { AuthProvider } from "./components/Auth/AuthContext";
import { ApolloProvider } from "@apollo/client";
import client from "./Utils/apolloClient";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Home from "./components/Home";
import Patient from "./components/Patient/Patient";
import Nurse from "./components/Nurse/Nurse";
import Settings from "./components/Patient/Settings";
import Stats from "./components/Patient/Stats";
import Users from "./components/Users/Users";
import TeamPage from "./components/TeamPage";
import Game from "./components/Game/Game";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container>
      <Router>
        <ApolloProvider client={client}>
          <AuthProvider>
            <Routes>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="settings" element={<Settings />} />
              <Route path="stats" element={<Stats />} />
              <Route path="users" element={<Users />} />
              <Route path="game" element={<Game />} />
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
          </AuthProvider>
        </ApolloProvider>
      </Router>
    </Container>
  );
}

export default App;
