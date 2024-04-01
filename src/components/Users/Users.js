import React from "react";
import { gql, useQuery } from "@apollo/client";
import { ListGroup, Spinner, Alert, Container } from "react-bootstrap";

const GET_ALL_USERS = gql`
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

const Users = () => {
  const { loading, error, data } = useQuery(GET_ALL_USERS);

  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  if (error) return <Alert variant="danger">Error! {error.message}</Alert>;

  return (
    <Container>
      <h2>All Users:</h2>
      <ListGroup>
        {data.users.map((user) => (
          <ListGroup.Item key={user._id}>
            {user.username} - {user.email}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Users;
