"use client";
import React, { useEffect, useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useAppContext } from "../contexts/apicontext";
import { useCookies } from "react-cookie";
import Link from "next/link";


const page = () => {
  const { Api } = useAppContext();
  const [_, setCookies] = useCookies(["access_token"]);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [show, setShow] = useState({
    color: "",
    show: false,
    dialog: "",
  });
  const [autoDismiss, setAutoDismiss] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = () => {
    if (formData.userName && formData.password) {
      fetch(`${Api}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            userName: "",
            password: "",
          });
          setCookies("access_token", data.token);
          window.localStorage.setItem("adminID", data.adminID);
          window.location.href = "../logout";
          setShow({
            color: data.color,
            dialog: data.message,
            show: true,
          });
          setAutoDismiss(true);
        });
    }
  };

  useEffect(()=>{
    let timer
    if(autoDismiss){
    timer = setTimeout(()=>{
      setShow({
        ...show,
        show: false,
      });
      setAutoDismiss(false)
    },2000)
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  },[autoDismiss, show])

  return (
    <div className="registration-container">
      <div className="registration-form">
        <Container>
          <Row className="justify-content-center mt-5 w-100">
            <Col md={6}>
              <div className="forms">
                <h2 className="text-center mb-5 text-success fw-bold">Login</h2>
                <Form>
                  <Form.Group controlId="formUsernam">
                    <Form.Control
                      className="mb-3"
                      type="text"
                      name="userName"
                      placeholder="Enter username"
                      value={formData.userName}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Control
                      className="mb-3"
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  
                  <Link href="../register">
                    <div className="link">
                      Sign Up
                    </div>
                  </Link>

                  <Button
                    className="w-100 bg-success border-success"
                    type="button"
                    onClick={login}
                  >
                    Save
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="alert-login">
          <Alert
            variant={show.color}
            show={show.show}
            onClose={() => setShow({ ...show, show: false })}
            dismissible
          >
            {show.dialog}
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default page;
