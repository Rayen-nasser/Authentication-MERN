"use client"
import React, { useState, useEffect } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useAppContext } from '../contexts/apicontext';

export const metadata = {
  title: 'register',
}

const Page = () => {
  const { Api } = useAppContext();
  const [show, setShow] = useState({
    color: '',
    show: false,
    dialog: '',
  });
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });
  const [autoDismiss, setAutoDismiss] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createUser = () => {
    if (formData.userName && formData.password) {
      fetch(`${Api}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          setShow({
            color: data.color,
            dialog: data.message,
            show: true,
          });
          setFormData({
            userName: '',
            password: '',
          });
          setAutoDismiss(true); 
          window.location.href = "../";
        })
        .catch((error) => {
          console.error(error);
          setShow({
            color: data.color, 
            dialog: data.message, 
            show: true,
          });
          setAutoDismiss(true); 
        });
    }
  };

  // Use useEffect to automatically dismiss the dialog after 2 seconds
  useEffect(() => {
    let timer;
    if (autoDismiss) {
      timer = setTimeout(() => {
        setShow({
          ...show,
          show: false,
        });
        setAutoDismiss(false); // Disable auto-dismissal
      }, 2000); // 2 seconds
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [autoDismiss, show]);

  return (
    <div className="registration-container">
      <div className="registration-form">

          <Row className="justify-content-center mt-5 w-100">
            <Col md={6}>
              <div className="forms">
                <h2 className='text-center mb-5 text-success fw-bold'>Create User</h2>
                <Form>
                  <Form.Group controlId="formUsername">
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
                    
                  <Button
                    className="w-100 bg-success border-success"
                    type="button"
                    onClick={createUser}
                  >
                    Save
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        <div className="alert">
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

export default Page;
