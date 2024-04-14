import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER, ADD_SYMPTOMS_INFORMATION } from "../../Utils/graphQLService";
import "./InfoArea.css";
import { Form, Row, Col, Button } from "react-bootstrap";

function Symptoms() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { data: userData } = useQuery(GET_USER);
  const userId = userData?.me?._id;
  const [selectedContact, setSelectedContact] = useState("no");

  const [addSymptoms, { loading, data, error: mutationError }] = useMutation(
    ADD_SYMPTOMS_INFORMATION
  );

  const symptoms = [
    { displayName: "Fever", schemaKey: "fever" },
    { displayName: "Tiredness", schemaKey: "tiredness" },
    { displayName: "Dry Cough", schemaKey: "dryCough" },
    {
      displayName: "Difficulty in Breathing",
      schemaKey: "difficultyInBreathing",
    },
    { displayName: "Sore Throat", schemaKey: "soreThroat" },
    { displayName: "Pains", schemaKey: "pains" },
    { displayName: "Nasal Congestion", schemaKey: "nasalCongestion" },
    { displayName: "Runny Nose", schemaKey: "runnyNose" },
    { displayName: "Diarrhea", schemaKey: "diarrhea" },
  ];

  const handleSymptomClick = (symptom) => {
    setSelectedSymptoms((prevSelectedSymptoms) => {
      const isAlreadySelected = prevSelectedSymptoms.some(
        (selected) => selected === symptom.displayName
      );
      return isAlreadySelected
        ? prevSelectedSymptoms.filter(
            (displayName) => displayName !== symptom.displayName
          )
        : [...prevSelectedSymptoms, symptom.displayName];
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedSymptoms.length === 0) {
      setError("Please select at least one symptom.");
      return;
    }

    const symptomsPayload = symptoms.reduce((acc, symptom) => {
      acc[symptom.schemaKey] = selectedSymptoms.includes(symptom.displayName);
      return acc;
    }, {});

    console.log("Symptoms Payload:", symptomsPayload);

    try {
      const response = await addSymptoms({
        variables: {
          _id: userId,
          ...symptomsPayload,
          contact: selectedContact,
        },
      });
      console.log("Submission successful, server response:", response);
      setSuccess(true);
      setError(null);
      setSelectedSymptoms([]); // Optionally clear selected symptoms after successful submission
    } catch (err) {
      console.error("Error submitting symptoms:", err);
      setError(
        `Failed to submit symptoms. ${err.message || "Please try again."}`
      );
    }
  };

  return (
    <>
      <div className="form-container-no-grid">
        <Form onSubmit={handleSubmit}>
          <Row className="symptoms-grid">
            {symptoms.map((symptom) => (
              <Col
                md={4}
                key={symptom.schemaKey}
                className={`symptom-card ${
                  selectedSymptoms.includes(symptom.displayName)
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleSymptomClick(symptom)}
              >
                <div className="card-content">{symptom.displayName}</div>
              </Col>
            ))}
          </Row>

          <Row>
            <Form.Group as={Row} controlId="contact">
              <Form.Label column md={6}>
                Recently had contact with a Covid-19 patient?
              </Form.Label>
              <Col md={6}>
                <Form.Check
                  inline
                  type="radio"
                  label="No"
                  name="contact"
                  value="no"
                  checked={selectedContact === "no"}
                  onChange={(e) => setSelectedContact(e.target.value)}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Yes"
                  name="contact"
                  value="yes"
                  checked={selectedContact === "yes"}
                  onChange={(e) => setSelectedContact(e.target.value)}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Don't Know"
                  name="contact"
                  value="dont-know"
                  checked={selectedContact === "dont-know"}
                  onChange={(e) => setSelectedContact(e.target.value)}
                />
              </Col>
            </Form.Group>
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
          {success && (
            <div className="button-container success-message">
              Submitted successfully!
              <br /> We appreciate your patience. Your nurse will get back to
              you with recommendations.
            </div>
          )}
          {error && (
            <div className="button-container error-message">{error}</div>
          )}
          {mutationError && (
            <div className="button-container error-message">
              {mutationError.message}
            </div>
          )}
          {loading && (
            <div className="button-container loading-message">
              Submitting...
            </div>
          )}
        </Form>
      </div>
    </>
  );
}

export default Symptoms;
