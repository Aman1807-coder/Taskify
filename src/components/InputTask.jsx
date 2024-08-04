import React, { useState } from 'react';

import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';


const InputTask = (props) => {
    const [input, setInput] = useState({
        title: '', description: '', priority: 'High'
    });

    const handleInput = (event) => {
        const { name, value } = event.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <Container>
            <Row className="mt-3 justify-content-center" style={{ minHeight: '50vh' }}>
                <Col xs={12} md={6} lg={4}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3">
                            Title
                        </InputGroup.Text>
                        <Form.Control id="basic-url" aria-describedby="basic-addon3"
                            name='title' onChange={handleInput} value={input.title}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>Description</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="With textarea"
                            name='description' onChange={handleInput} value={input.description}
                        />
                    </InputGroup>

                    <Form.Select name='priority' onChange={handleInput}>
                        <option value="High" selected={input.priority === 'High' ? true : false}>High</option>
                        <option value="Medium" selected={input.priority === 'Medium' ? true : false}>Medium</option>
                        <option value="Low" selected={input.priority === 'Low' ? true : false}>Low</option>
                    </Form.Select>

                    <Button className='mt-3' variant="danger"
                        onClick={() => props.onTaskAdd(input, setInput)}>Add Task</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default InputTask