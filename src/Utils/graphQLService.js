import { gql } from "@apollo/client";

export const GET_USER = gql`
  query Users {
    me {
      _id
      email
      firstName
      lastName
      type
      vitalSignsInformation {
        bodyTemperature
        heartRate
        systolicBloodPressure
        diastolicBloodPressure
        respirationRate
        weight
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  query Users {
    users {
      _id
      username
      email
      firstName
      lastName
      createdAt
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $type: String!
    $dateOfBirth: String!
  ) {
    signup(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      type: $type
      dateOfBirth: $dateOfBirth
    ) {
      token
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const ADD_VITALS_INFORMATION = gql`
  mutation AddVitalsInformation(
    $_id: String!
    $bodyTemperature: Float!
    $heartRate: Float!
    $systolicBloodPressure: Float!
    $diastolicBloodPressure: Float!
    $respirationRate: Float!
    $weight: Float!
  ) {
    addVitalsInformation(
      _id: $_id
      bodyTemperature: $bodyTemperature
      heartRate: $heartRate
      systolicBloodPressure: $systolicBloodPressure
      diastolicBloodPressure: $diastolicBloodPressure
      respirationRate: $respirationRate
      weight: $weight
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

export const ADD_SYMPTOMS_INFORMATION = gql`
  mutation AddSymptomsData(
    $_id: String!
    $fever: Boolean
    $tiredness: Boolean
    $dryCough: Boolean
    $difficultyInBreathing: Boolean
    $soreThroat: Boolean
    $pains: Boolean
    $nasalCongestion: Boolean
    $runnyNose: Boolean
    $diarrhea: Boolean
    $contact: String
  ) {
    addSymptomsData(
      _id: $_id
      fever: $fever
      tiredness: $tiredness
      dryCough: $dryCough
      difficultyInBreathing: $difficultyInBreathing
      soreThroat: $soreThroat
      pains: $pains
      nasalCongestion: $nasalCongestion
      runnyNose: $runnyNose
      diarrhea: $diarrhea
      contact: $contact
    ) {
      _id
      fever
      tiredness
      dryCough
      difficultyInBreathing
      soreThroat
      pains
      nasalCongestion
      runnyNose
      diarrhea
      contact
    }
  }
`;
