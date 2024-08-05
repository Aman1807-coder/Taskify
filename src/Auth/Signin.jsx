import React, { useEffect, useState } from 'react';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useFirebase } from '../context/firebase';

const Signin = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [inputSignin, setInputSignin] = useState({
        email: "", password: ""
    });

    useEffect(() => {
        if (firebase.isLoggedIn) navigate('/');
    }, [firebase, navigate]);

    const handleInputSignin = (event) => {
        const { name, value } = event.target;
        setInputSignin((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await firebase.signinUserWithEmailAndPassword(inputSignin.email, inputSignin.password)

        } catch (error) {
            alert(error)
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
                                placeholder="Enter email" onChange={handleInputSignin} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name='password'
                                placeholder="Password" onChange={handleInputSignin} />
                        </Form.Group>
                        
                        <Row>
                            <Col xs={4}>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Col>
                            <Col xs='auto'>
                                <span>Haven't Signedup yet? </span>
                                <NavLink to="/signup">Signup</NavLink>
                            </Col>
                        </Row>
                    </Form>
                    <h4>OR</h4>
                    <Button variant="danger"
                        onClick={firebase.signinWithGoogle}>Signin with Google</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Signin