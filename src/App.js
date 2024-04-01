import "./App.css";
import Home from "./components/Home";
import Patient from "./components/Patient/Patient";
import Nurse from "./components/Nurse/Nurse";
import Personal from "./components/Patient/Personal";
import Stats from "./components/Patient/Stats";
import Users from "./components/Users/Users";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="patient" element={<Patient />} />
          <Route path="personal" element={<Personal />} />
          <Route path="stats" element={<Stats />} />
          <Route path="users" element={<Users />} />
          <Route path="nurse" element={<Nurse />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
