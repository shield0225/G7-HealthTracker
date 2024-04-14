import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "./Dashboard.css";
import { useAuth } from "../Auth/AuthContext";

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { userDetails } = useAuth();

  // Function to toggle visibility of sections
  const toggleSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.classList.toggle("hidden");
  };

  const token = localStorage.getItem("token");
  const graphqlUrl = "https://comp308-group7.onrender.com/graphql/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(graphqlUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: `
              query {
                users {
                  _id
                  firstName
                  lastName
                  email
                  type
                }
              }
            `,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setPatients(data.data.users);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  //const handlePatientSelect = (patient) => {
  //    setSelectedPatient(patient);
  //};
  const handlePatientSelect = async (patient) => {
    try {
      const response = await fetch(graphqlUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
            query GetPatientSigns($_id: String!) {
              patient(_id: $_id) {
                _id
                firstName
                lastName
                email
                type
                vitalSignsInformation {
                  bodyTemperature
                  heartRate
                  respirationRate
                  weight
                  createdAt
                  updatedAt
                }
              }
            }
          `,
          variables: {
            _id: patient._id,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch patient signs");
      }

      const data = await response.json();
      setSelectedPatient(data.data.patient);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="table-container">
        <h2>Patient Information</h2>
        <table border="1">
          <tr className="section-header">
            <th colSpan="2"></th>
          </tr>
          <tbody id="patient-info">
            <tr>
              <td>Id:</td>
              <td>{selectedPatient ? selectedPatient._id : ""}</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>
                {selectedPatient
                  ? selectedPatient.firstName + " " + selectedPatient.lastName
                  : ""}
              </td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{selectedPatient ? selectedPatient.email : ""}</td>
            </tr>
            <tr></tr>

            {/* Hidden Sections */}
            <tr
              className="section-header"
              onClick={() => toggleSection("signs")}
            >
              <th colSpan="2">Signs </th>
            </tr>

            {selectedPatient &&
              selectedPatient.vitalSignsInformation &&
              selectedPatient.vitalSignsInformation.length > 0 && (
                <>
                  <tr>
                    <td>Body Temperature:</td>
                    <td>
                      {
                        selectedPatient.vitalSignsInformation[
                          selectedPatient.vitalSignsInformation.length - 1
                        ].bodyTemperature
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Heart Rate:</td>
                    <td>
                      {
                        selectedPatient.vitalSignsInformation[
                          selectedPatient.vitalSignsInformation.length - 1
                        ].heartRate
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Respiration Rate:</td>
                    <td>
                      {
                        selectedPatient.vitalSignsInformation[
                          selectedPatient.vitalSignsInformation.length - 1
                        ].respirationRate
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Weight:</td>
                    <td>
                      {
                        selectedPatient.vitalSignsInformation[
                          selectedPatient.vitalSignsInformation.length - 1
                        ].weight
                      }
                    </td>
                  </tr>
                </>
              )}

            <tr
              className="section-header"
              onClick={() => toggleSection("health-care-info")}
            >
              <th colSpan="2">
                Health Care Info <button>Show/Hide</button>
              </th>
            </tr>
            <tbody id="health-care-info" className="hidden">
              <tr>
                <td>Blood Type:</td>
                <td>O+</td>
              </tr>
              <tr>
                <td>Allergies:</td>
                <td>None</td>
              </tr>
              <tr>
                <td>Medications:</td>
                <td>Aspirin</td>
              </tr>
            </tbody>

            <tr
              className="section-header"
              onClick={() => toggleSection("emergency-contact")}
            >
              <th colSpan="2">
                Emergency Contact <button>Show/Hide</button>
              </th>
            </tr>
            <tbody id="emergency-contact" className="hidden">
              <tr>
                <td>Name:</td>
                <td>Jane Doe</td>
              </tr>
              <tr>
                <td>Relation:</td>
                <td>Spouse</td>
              </tr>
              <tr>
                <td>Contact Number:</td>
                <td>123-456-7890</td>
              </tr>
              <tr></tr>
            </tbody>
          </tbody>
        </table>
      </div>
      <div className="table-container">
        <h2>Patients</h2>
        <Table bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {patients
              .filter((patient) => patient.type === "patient")
              .map((patient) => (
                <tr key={patient._id}>
                  <td>
                    <input
                      type="radio"
                      name="selectedPatient"
                      onChange={() => handlePatientSelect(patient)}
                    />
                  </td>
                  <td>
                    {patient.firstName} {patient.lastName}
                  </td>
                  <td>{patient.type}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Dashboard;
