import React, { useState } from "react";
import "./Stats.css";
import { Form, Container, Button } from "react-bootstrap";

function Stats() {
  const [formData, setFormData] = useState({
    bodyTemperature: '',
    heartRate: '',
    bloodPressure: '',
    respirationRate: '',
    weight: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
      <Form className="form-container" onSubmit={handleSubmit}>
      <Container className="form-field">
        <Form.Label className="label" htmlFor="bodyTemperature">Body Temperature</Form.Label>
        <Form.Control 
          type="number" 
          id="bodyTemperature" 
          className="input-field" 
          name="bodyTemperature"
          value={formData.bodyTemperature}
          onChange={handleChange}
        />
      </Container>
      <Container className="form-field">
        <Form.Label className="label" htmlFor="heartRate">Heart Rate</Form.Label>
        <Form.Control 
          type="number" 
          id="heartRate" 
          className="input-field" 
          name="heartRate"
          value={formData.heartRate}
          onChange={handleChange}
        />
      </Container>
      {/* Repeat for other fields */}
      <Button type="submit" className="submit-button">Submit</Button>
    </Form>

  );
}

export default Stats;
