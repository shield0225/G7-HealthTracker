import { gql } from "@apollo/client";

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

export const GET_USER = gql`
  query Users {
    me {
      _id
      email
      firstName
      lastName
      type
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
