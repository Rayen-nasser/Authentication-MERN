"use client";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../contexts/apicontext";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Badge, Container, ListGroup } from "react-bootstrap";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { Api } = useAppContext();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${Api}/users`, {
          //=== SSR ===
          cache: "no-cache",
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchData();
  }, [users]);

  const usersJSX = users.map(({_id, name, age, email }) => {
    return (
      <ListGroup key={_id}>
        <ListGroup.Item
          variant="dark"
          className="mt-3 d-flex justify-content-between "
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{name}</div>
            {email}
          </div>
          <Badge bg="success" className="h-100" pill>
            {age}
          </Badge>
        </ListGroup.Item>
      </ListGroup>
    );
  });

  return <div className="result">
            <Container>
              {usersJSX}
            </Container>
        </div>;
};

export default Users;
