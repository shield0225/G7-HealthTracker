import React, { useState } from "react";
import "./InfoArea.css";
import { Form, Row, Col, Button } from "react-bootstrap";

function Symptoms() {
  const [newSymptom, setNewSymptom] = useState("");
  const [symptomsList, setSymptomsList] = useState([]);

  const symptoms = [
    "Fever",
    "Tiredness",
    "Dry Cough",
    "Fatigue",
    "Difficulty in Breathing",
    "Pains",
    "Nasal Congestion",
    "Runny Nose",
    "Diarrhea",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newSymptom.trim() !== "" && !symptomsList.includes(newSymptom)) {
      setSymptomsList([...symptomsList, newSymptom]);
      setNewSymptom("");
    }
  };

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedSymptoms([...selectedSymptoms, value]);
    } else {
      setSelectedSymptoms(
        selectedSymptoms.filter((symptom) => symptom !== value)
      );
    }
  };

  return (
    <>
      <div className="form-container-no-grid">
        <div className="symptoms-grid">
          <Form onSubmit={handleSubmit}>
            <Row className="symptoms-grid">
              {symptoms.map((symptom) => (
                <Col md={4} key={symptom} className="symptom-card">
                  {" "}
                  <Form.Check type="checkbox">
                    <Form.Check.Input
                      type="checkbox"
                      value={symptom}
                      checked={selectedSymptoms.includes(symptom)}
                      onChange={handleCheckboxChange}
                      id={`checkbox-${symptom}`}
                    />
                    <Form.Check.Label htmlFor={`checkbox-${symptom}`}>
                      {symptom}
                    </Form.Check.Label>
                  </Form.Check>
                </Col>
              ))}
            </Row>
            <div className="button-container">
              <Button
                type="submit"
                className="submit-button"
                style={{ width: 200 }}
              >
                Submit Selections
              </Button>
            </div>
            {/* {data && ( */}
            <div className="button-container success-message">
              Submitted successfully! Please wait for your nurse's
              recommendations.
            </div>
            {/* )} */}
          </Form>
        </div>
      </div>
      <div className="symptoms-list">
        <h2>Symptoms History</h2>
        {symptomsList.length === 0 ? (
          <p>No symptoms recorded yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Symptom</th>
              </tr>
            </thead>
            <tbody>
              {symptomsList.map((symptom, index) => (
                <tr key={index}>
                  <td>{symptom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Symptoms;
