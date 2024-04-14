import React from "react";
import { useQuery } from "@apollo/client";
import { ListGroup, Spinner, Alert, Container } from "react-bootstrap";
import { GET_ALL_USERS } from "../../Utils/graphQLService";

function Users() {
  const { loading, error, data } = useQuery(GET_ALL_USERS);

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (error) {
    return <Alert variant="danger">Error! {error.message}</Alert>;
  }

  return (
    <Container>
      <h2>All Users:</h2>
      <ListGroup>
        {data &&
          data.users &&
          data.users.map((user) => (
            <ListGroup.Item key={user._id}>
              {user.username} - {user.email}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Container>
  );
}

export default Users;
