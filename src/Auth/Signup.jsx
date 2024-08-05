import React, { useState, useEffect } from 'react';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useFirebase } from '../context/firebase';

const Signup = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [inputSignup, setInputSignup] = useState({
        email: "", password: ""
    });

    useEffect(() => {
        if (firebase.isLoggedIn) {
            navigate('/')
        };
    }, [firebase, navigate]);

    const handleInputSignup = (event) => {
        const { name, value } = event.target;
        setInputSignup((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await firebase.signupUserWithEmailAndPassword(inputSignup.email, inputSignup.password)
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <Container>
            <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <Col xs={12} md={6} lg={4}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name='email'
                                placeholder="Enter email" onChange={handleInputSignup} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name='password'
                                placeholder="Password" onChange={handleInputSignup} />
                        </Form.Group>

                        <Row>
                            <Col xs={4}>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Col>
                            <Col xs='auto'>
                                <span>Already Signedup? </span>
                                <NavLink to="/signin">Signin</NavLink>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Signup;