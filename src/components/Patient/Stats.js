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
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    bodyTemperature: "",
    heartRate: "",
    systolicBloodPressure: "",
    diastolicBloodPressure: "",
    respirationRate: "",
    weight: "",
  });

  const validateForm = () => {
    let newErrors = {};

    if (
      Number(formData.bodyTemperature) < 30 ||
      Number(formData.bodyTemperature) > 50
    ) {
      newErrors.bodyTemperature =
        "Body temperature must be between 30°C and 50°C.";
    } else {
      delete newErrors.bodyTemperature;
    }

    if (Number(formData.heartRate) < 50 || Number(formData.heartRate) > 250) {
      newErrors.heartRate = "Heart rate must be between 50 bpm and 250 bpm.";
    } else {
      delete newErrors.heartRate;
    }

    if (Number(formData.weight) < 10) {
      newErrors.weight = "Weight must be at least 10 lbs.";
    } else {
      delete newErrors.weight;
    }

    if (!formData.systolicBloodPressure) {
      newErrors.systolicBloodPressure = "Systolic blood pressure is required.";
    } else if (Number(formData.systolicBloodPressure) <= 0) {
      newErrors.systolicBloodPressure =
        "Systolic blood pressure must be greater than 0.";
    } else {
      delete newErrors.systolicBloodPressure;
    }

    if (!formData.diastolicBloodPressure) {
      newErrors.diastolicBloodPressure =
        "Diastolic blood pressure is required.";
    } else if (Number(formData.diastolicBloodPressure) <= 0) {
      newErrors.diastolicBloodPressure =
        "Diastolic blood pressure must be greater than 0.";
    } else {
      delete newErrors.diastolicBloodPressure;
    }

    if (
      Number(formData.systolicBloodPressure) <=
      Number(formData.diastolicBloodPressure)
    ) {
      newErrors.bloodPressure =
        "Systolic pressure must be greater than diastolic pressure.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const graphqlUrl = "http://localhost:4000/graphql/";
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjBhZGI2OWQxZTJjM2RmNWExMzA3NWUiLCJ1c2VyVHlwZSI6InBhdGllbnQiLCJpYXQiOjE3MTE5ODc1NjEsImV4cCI6MTc0MzU0NTE2MX0.c0vW0louK3MIVMAJgi3ED1oYTe12_4s1YXin1QILso0";

    // Construct the mutation query
    //${formData.bloodPressureSystolic}
    const mutation = `
  mutation {
    addVitalsInformation(
      _id: "660adb69d1e2c3df5a13075e"
      bodyTemperature: ${formData.bodyTemperature}
      heartRate:  ${formData.heartRate}
      systolicBloodPressure: ${formData.systolicBloodPressure}
      diastolicBloodPressure: ${formData.diastolicBloodPressure}   
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
            className="input-field"
            name="bodyTemperature"
            value={formData.bodyTemperature}
            onChange={handleChange}
            placeholder="°C"
            isInvalid={!!errors.bodyTemperature}
          />
          <i className="text-small">* Please measure your temperature in °C</i>
          {errors.bodyTemperature && (
            <div className="error-message">{errors.bodyTemperature}</div>
          )}
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
            className="input-field"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="lbs"
            isInvalid={!!errors.weight}
          />
          <i className="text-small">* Please measure your weight in lbs</i>
          {errors.weight && (
            <div className="error-message">{errors.weight}</div>
          )}
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
            className="input-field"
            name="heartRate"
            value={formData.heartRate}
            onChange={handleChange}
            placeholder="bpm"
            isInvalid={!!errors.heartRate}
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
          {errors.heartRate && (
            <div className="error-message">{errors.heartRate}</div>
          )}
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
            name="systolicBloodPressure"
            className="mb-2 input-field"
            value={formData.systolicBloodPressure}
            onChange={handleChange}
            isInvalid={!!errors.systolicBloodPressure}
          />
          {errors.systolicBloodPressure && (
            <div className="error-message">{errors.systolicBloodPressure}</div>
          )}
        </Col>
        <Col xs={5}>
          <Form.Label className="label">Diastolic:</Form.Label>
          <Form.Control
            type="number"
            name="diastolicBloodPressure"
            className="input-field"
            value={formData.diastolicBloodPressure}
            onChange={handleChange}
            isInvalid={!!errors.diastolicBloodPressure}
          />
          {errors.diastolicBloodPressure && (
            <div className="error-message">{errors.diastolicBloodPressure}</div>
          )}
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
            className="input-field"
            name="respirationRate"
            value={formData.respirationRate}
            onChange={handleChange}
            placeholder="breaths per minute"
            isInvalid={!!errors.respirationRate}
          />
          <Col xs={1}></Col>
          <Col xs={11}>
            <i className="text-small">
              * Using a stopwatch or clock with a second hand, count the number
              of breaths for one full minute
            </i>
            {errors.respirationRate && (
              <div className="error-message">{errors.respirationRate}</div>
            )}
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
