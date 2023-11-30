"use client";

import React, { useState } from "react";
import { useAppContext } from "../contexts/apicontext";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form } from "react-bootstrap";
const CreateUser = () => {
  const { Api } = useAppContext();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
  });

  const createUser = () => {
    if (formData.name && formData.age && formData.email) {
      fetch(`${Api}/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then(() => {
        setFormData({
          name: "",
          age: "",
          email: "",
        });
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="result">
        <Container>
        <Form>
            <Form.Group className="mb-3">
            <Form.Control
                type="text"
                name="name"
                placeholder="UserName"
                value={formData.name}
                onChange={handleInputChange}
            />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Control
                type="text"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleInputChange}
            />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
            />
            </Form.Group>
            <Button className="w-100 bg-success border-success" type="button" onClick={createUser}>
            Create
            </Button>
        </Form>
        </Container>
    </div>
  );
};

export default CreateUser;
