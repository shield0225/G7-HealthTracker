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

  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newSymptom.trim() !== "" && !symptomsList.includes(newSymptom)) {
      setSymptomsList([...symptomsList, newSymptom]);
      setNewSymptom("");
      setData(true);
      console.log("Symptom/s added successfully!");
    } else {
      setError("Failed to add symptoms. Please try again.");
      console.log("Failed to add symptoms. Please try again.");
    }
  };

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const handleSymptomClick = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  return (
    <>
      <div className="form-container-no-grid">
        <div className="symptoms-grid">
          <Form onSubmit={handleSubmit}>
            <Row className="symptoms-grid">
              {symptoms.map((symptom) => (
                <Col
                  md={4}
                  key={symptom}
                  className={`symptom-card ${
                    selectedSymptoms.includes(symptom) ? "selected" : ""
                  }`}
                >
                  <div
                    className="card-content"
                    onClick={() => handleSymptomClick(symptom)}
                  >
                    {symptom}
                  </div>
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
            {data && (
              <div className="button-container success-message">
                Submitted successfully! Please wait for your nurse's
                recommendations.
              </div>
            )}
            {error && (
              <div className="button-container error-message">{error}</div>
            )}
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
