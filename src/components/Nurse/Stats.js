import React, { useState } from "react";
import "./InfoArea.css";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FaTemperatureLow } from "react-icons/fa";
import { FaWeightScale } from "react-icons/fa6";
import { TbHeartRateMonitor } from "react-icons/tb";
import { ReactComponent as RespIcon } from "../../assets/material-symbols-light--respiratory-rate.svg";
import { ReactComponent as BloodPressureIcon } from "../../assets/blood-pressure-icon.svg";
import "bootstrap/dist/css/bootstrap.min.css";

function Stats() {
  const [formData, setFormData] = useState({
    bodyTemperature: "",
    heartRate: "",
    bloodPressure: "",
    respirationRate: "",
    weight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const graphqlUrl = "http://localhost:4000/graphql/";
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjA4ZWZjMDUwOGViMjliMDQ4ZWY4MWYiLCJ1c2VyVHlwZSI6Im51cnNlIiwiaWF0IjoxNzExODYxOTY0LCJleHAiOjE3NDM0MTk1NjR9.j9wpnJzWWEnJgoYKXrQlQBiwNHIs0mdsnLIxEIYTpRE";

    // Construct the mutation query
    //${formData.bloodPressureSystolic}
    const mutation = `
  mutation {
    addVitalsInformation(
      _id: "6608efc4508eb29b048ef82a"
      bodyTemperature: ${formData.bodyTemperature}
      heartRate:  ${formData.heartRate}
      systolicBloodPressure: ${formData.bloodPressureSystolic}
      diastolicBloodPressure: ${formData.bloodPressureDiastolic}   
      respirationRate: ${formData.respirationRate}
      weight: ${formData.weight}
    ) {
      _id
      bodyTemperature
      heartRate
      systolicBloodPressure
      diastolicBloodPressure
      respirationRate
      weight
    }
  }
  
  `;

    try {
      // Send the mutation request
      const response = await fetch(graphqlUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
        body: JSON.stringify({ query: mutation }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      // Parse the response JSON
      const responseData = await response.json();

      // Log the response data
      console.log(responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Form className="form-container" onSubmit={handleSubmit}>
      <Row className=" form-field align-items-left">
        <Col xs={1}>
          <FaTemperatureLow className="icon" />
        </Col>
        <Col xs={11}>
          <Form.Label className="label">Body Temperature</Form.Label>
          <Form.Control
            type="number"
            id="bodyTemperature"
            className="input-field"
            name="bodyTemperature"
            value={formData.bodyTemperature}
            onChange={handleChange}
            placeholder="°C"
          />
          <i className="text-small">* Please measure your temperature in °C</i>
        </Col>
      </Row>
      <Row className=" form-field align-items-left">
        <Col xs={1}>
          <FaWeightScale className="icon" />
        </Col>
        <Col xs={11}>
          <Form.Label className="label">Weight</Form.Label>
          <Form.Control
            type="number"
            id="weight"
            className="input-field"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="lbs"
          />
          <i className="text-small">* Please measure your weight in lbs</i>
        </Col>
      </Row>
      <Row className=" form-field align-items-left">
        <Col xs={1}>
          <TbHeartRateMonitor className="icon" />
        </Col>
        <Col xs={11}>
          <Form.Label className="label">Heart Rate</Form.Label>
          <Form.Control
            type="number"
            id="heartRate"
            className="input-field"
            name="heartRate"
            value={formData.heartRate}
            onChange={handleChange}
            placeholder="bpm"
          />
          <i className="text-small">
            * Place two fingers (index and middle) on the inside of the{" "}
            <strong>wrist</strong> at the base of the thumb. Press lightly until
            you feel the pulse.
          </i>
          <br />
          <i className="text-small">
            * Or gently place two fingers on the side of the{" "}
            <strong>neck</strong>, just under the jawline. Be careful not to
            press too hard.
          </i>
        </Col>
      </Row>

      <Row className="form-field  align-items-left">
        <Col xs={1}>
          <BloodPressureIcon className="icon" />
        </Col>
        <Col xs={11}>
          <Form.Label className="label">Blood Pressure</Form.Label>
        </Col>
        <Col xs={1}></Col>
        <Col xs={5}>
          <Form.Label className="label">Systolic:</Form.Label>
          <Form.Control
            type="number"
            name="bloodPressureSystolic"
            className="mb-2 input-field"
            id="bloodPressureSystolic"
            value={formData.bloodPressureSystolic}
            onChange={handleChange}
          />
        </Col>
        <Col xs={5}>
          <Form.Label className="label">Diastolic:</Form.Label>
          <Form.Control
            type="number"
            name="bloodPressureDiastolic"
            className="input-field"
            id="bloodPressureDiastolic"
            value={formData.bloodPressureDiastolic}
            onChange={handleChange}
          />
        </Col>
        <Col xs={1}></Col>
        <Col xs={1}></Col>
        <Col xs={11}>
          <i className="text-small">
            * Systolic (the pressure when heart beats) over diastolic (the
            pressure when heart is at rest between beats){" "}
          </i>
          <br />
          <i className="text-small">
            * Measured in millimeters of mercury (mmHg).{" "}
          </i>
          <br />
          <i className="text-small">
            * Please use a sphygmomanometer (a blood pressure cuff) or a
            stethoscope.
          </i>
        </Col>
      </Row>

      <Row className=" form-field align-items-left">
        <Col xs={1}>
          <RespIcon className="icon" />
        </Col>
        <Col xs={11}>
          <Form.Label className="label">Respiration Rate</Form.Label>
          <Form.Control
            type="number"
            id="respirationRate"
            className="input-field"
            name="respirationRate"
            value={formData.respirationRate}
            onChange={handleChange}
            placeholder="breaths per minute"
          />
          <Col xs={1}></Col>
          <Col xs={11}>
            <i className="text-small">
              * Using a stopwatch or clock with a second hand, count the number
              of breaths for one full minute
            </i>
          </Col>
        </Col>
      </Row>

      <Row className="form-field  align-items-center">
        <Col className="text-center">
          <Button type="submit" className="submit-button">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default Stats;
