import React, { useState, useEffect } from "react";
import { Form, Table, Row, Col, Container } from "react-bootstrap";
import "./Dashboard.css";
import { useQuery } from "@apollo/client";
import {
  GET_PATIENT_SIGNS,
  GET_ALL_USERS,
  GET_SYMPTOMS_BY_ID,
} from "../../Utils/graphQLService";

function Dashboard() {
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [filteredSymptoms, setFilteredSymptoms] = useState([]);

  const {
    loading: loadingPatients,
    error: errorPatients,
    data: dataPatients,
  } = useQuery(GET_ALL_USERS);

  const handlePatientSelect = (event) => {
    console.log("New patient ID selected:", event.target.value);
    setSelectedPatientId(event.target.value);
  };

  const {
    loading: loadingVitals,
    error: errorVitals,
    data: dataVitals,
  } = useQuery(GET_PATIENT_SIGNS, {
    variables: { id: selectedPatientId },
    skip: !selectedPatientId,
  });

  const {
    loading: loadingSymptoms,
    error: errorSymptoms,
    data: dataSymptoms,
  } = useQuery(GET_SYMPTOMS_BY_ID, {
    variables: { id: selectedPatientId },
    skip: !selectedPatientId,
  });

  useEffect(() => {}, [selectedPatientId]);

  useEffect(() => {
    if (dataSymptoms && dataSymptoms.symptoms) {
      const symptomsList = dataSymptoms.symptoms
        .map((symptom) => {
          return Object.keys(symptom)
            .filter((key) => symptom[key] === true)
            .map((key) => ({ name: key, value: symptom[key] }));
        })
        .flat();
      setFilteredSymptoms(symptomsList);
    }
  }, [dataSymptoms]);

  if (loadingPatients || loadingVitals || loadingSymptoms) {
    return <p>Loading...</p>;
  }
  if (errorPatients || errorVitals || errorSymptoms) {
    return (
      <p>
        Error loading data:{" "}
        {errorPatients?.message ||
          errorVitals?.message ||
          errorSymptoms?.message}
      </p>
    );
  }

  return (
    <Container className="form-container">
      <Row className="mb-3">
        <Form.Control
          as="select"
          value={selectedPatientId}
          onChange={handlePatientSelect}
          className="input-field"
        >
          <option value="">Select a patient</option>
          {loadingPatients ? (
            <option>Loading patients...</option>
          ) : errorPatients ? (
            <option>Error loading patients</option>
          ) : (
            dataPatients &&
            dataPatients.users
              .filter((user) => user.type === "patient")
              .map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.firstName} {patient.lastName}
                </option>
              ))
          )}
        </Form.Control>
      </Row>
      <Row></Row>
      <Row>
        <h4>Patient Information</h4>
      </Row>
      <Row className="table-container">
        {dataVitals && dataVitals.patient && (
          <Col>
            <Table bordered hover>
              <tbody>
                <tr>
                  <td>ID</td>
                  <td>{dataVitals.patient._id}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>
                    {dataVitals.patient.firstName} {dataVitals.patient.lastName}
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{dataVitals.patient.email}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        )}
      </Row>
      <Row id="signs">
        <Col>
          <h3 className="title">Signs</h3>
          {dataVitals && dataVitals.patient && (
            <Table bordered hover>
              <tbody>
                <tr>
                  <td>Body Temperature</td>
                  <td>
                    {dataVitals.patient.vitalSignsInformation?.bodyTemperature}
                  </td>
                </tr>
                <tr>
                  <td>Heart Rate</td>
                  <td>{dataVitals.patient.vitalSignsInformation?.heartRate}</td>
                </tr>
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
      <Row id="symptoms">
        <h3 className="title">Symptoms</h3>
        <ul>
          {filteredSymptoms.map((symptom, index) => (
            <li key={index}>
              {symptom.name}: {symptom.value.toString()}
            </li>
          ))}
        </ul>
      </Row>
      <Row id="health-care-info">
        <Col>
          <h3 className="title">Health Care Info</h3>
          <Table bordered hover>
            <tbody>
              <tr>
                <td>Blood Type</td>
                <td>O+</td>
              </tr>
              <tr>
                <td>Allergies</td>
                <td>None</td>
              </tr>
              <tr>
                <td>Medications</td>
                <td>Aspirin</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row id="emergency-contact">
        <Col>
          <h3 className="title">Emergency Contact</h3>
          <Table bordered hover>
            <tbody>
              <tr>
                <td>Name</td>
                <td>Jane Doe</td>
              </tr>
              <tr>
                <td>Relation</td>
                <td>Spouse</td>
              </tr>
              <tr>
                <td>Contact Number</td>
                <td>123-456-7890</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
