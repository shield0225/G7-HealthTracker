import "./App.css";
import Home from "./components/Home";
import Patient from "./components/Patient/Patient";
import Personal from "./components/Patient/Personal";
import Stats from "./components/Patient/Stats";
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
          <Route path="patient-dashboard" element={<Patient />} />
        </Routes>
        <div className="container"></div>
      </Router>
    </Container>
  );
}

export default App;
