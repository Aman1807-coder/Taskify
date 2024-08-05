import React from 'react';
import { Container, Form, Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/firebase';

const NavBar = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await firebase.signoutUser()
            console.log(res)
            navigate('/signin');
        } catch (error) {
            alert(error);
        }
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="#">Taskify</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {firebase.isLoggedIn && <Nav.Link href="">{firebase.user.email}</Nav.Link>}

                    </Nav>
                    <Form className="d-flex">
                        {firebase.isLoggedIn && <Button onClick={handleLogout} variant="outline-danger">Logout</Button>}
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar