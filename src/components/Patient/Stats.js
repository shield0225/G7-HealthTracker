import React, { useState } from "react";
import "./InfoArea.css";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FaTemperatureLow } from "react-icons/fa";
import { FaWeightScale } from "react-icons/fa6";
import { TbHeartRateMonitor } from "react-icons/tb";
import { ReactComponent as RespIcon } from "../../assets/material-symbols-light--respiratory-rate.svg";
import { ReactComponent as BloodPressureIcon } from "../../assets/blood-pressure-icon.svg";
import { validateStats } from "../Validation";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_VITALS_INFORMATION, GET_USER } from "../../Utils/graphQLService";

function Stats() {

  const [errors, setErrors] = useState({});
  const { data: userData } = useQuery(GET_USER);
  const userId = userData?.me?._id;

  const [formData, setFormData] = useState({
    _id: userId,
    bodyTemperature: "",
    heartRate: "",
    systolicBloodPressure: "",
    diastolicBloodPressure: "",
    respirationRate: "",
    weight: "",
  });

  const [addVitalsInformation, { loading, error, data: vitalsData }] =
    useMutation(ADD_VITALS_INFORMATION);

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
    const validationErrors = validateStats(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0 && userId) {
      try {
        // Send the mutation request
        const response = await addVitalsInformation({
          variables: {
            _id: userId,
            bodyTemperature: parseFloat(formData.bodyTemperature),
            heartRate: parseFloat(formData.heartRate),
            systolicBloodPressure: parseFloat(formData.systolicBloodPressure),
            diastolicBloodPressure: parseFloat(formData.diastolicBloodPressure),
            respirationRate: parseFloat(formData.respirationRate),
            weight: parseFloat(formData.weight),
          },
        });

        // Log the response data
        console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
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
          {errors.bodyTemperature && (
            <div className="error-message">{errors.bodyTemperature}</div>
          )}
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
            className="input-field"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="lbs"
            isInvalid={!!errors.weight}
          />
          {errors.weight && (
            <div className="error-message">{errors.weight}</div>
          )}
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
            className="input-field"
            name="heartRate"
            value={formData.heartRate}
            onChange={handleChange}
            placeholder="bpm"
            isInvalid={!!errors.heartRate}
          />
          {errors.heartRate && (
            <div className="error-message">{errors.heartRate}</div>
          )}
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
          {errors.respirationRate && (
            <div className="error-message">{errors.respirationRate}</div>
          )}
          <Col xs={1}></Col>
          <Col xs={11}>
            <i className="text-small">
              * Using a stopwatch or clock with a second hand, count the number
              of breaths for one full minute
            </i>
          </Col>
        </Col>
      </Row>
      <Row className="form-field align-items-center">
        <div className="button-container">
          <Button type="submit" className="submit-button">
            Submit
          </Button>
        </div>{" "}
        <div className="button-container">
          {loading && <div className="success-message">Loading...</div>}
          {error && <div className="error-message">Error: {error.message}</div>}
          {vitalsData && (
            <div className="success-message">
              Success! Vitals information added.
            </div>
          )}
        </div>
      </Row>
    </Form>
  );
}

export default Stats;
