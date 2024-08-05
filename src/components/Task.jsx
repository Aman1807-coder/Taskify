import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Card } from 'react-bootstrap';


const Task = ({ id, task, onDelete, onUpdate }) => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateInput, setUpdateInput] = useState({
        title: task.title, description: task.description, priority: task.priority
    });

    const handleUpdate = (event) => {
        const { name, value } = event.target;
        setUpdateInput((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        !isUpdate ?
            (
                <Col xs={12} md={6} lg={4}>
                    <Card className="mb-3"
                        border={task.priority === 'High' ? 'danger' :
                            task.priority === 'Medium' ? 'warning' : 'success'}>
                        <Card.Header>
                            <Row>
                                <Col xs={9}>
                                    {task.title}
                                </Col>
                                <Col>
                                    <span style={{
                                        color: task.priority === 'High' ? 'red' :
                                            task.priority === 'Medium' ? 'orange' : 'green',
                                    }}>{task.priority}</span>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>{task.description}</Card.Text>                            <Button variant="success" className='m-1' onClick={() => setIsUpdate(true)}>Update</Button>
                            <Button variant="danger" onClick={() => onDelete(id)}>Delete</Button>
                        </Card.Body>
                    </Card>
                </Col>
            ) : (
                <Col xs={12} md={6} lg={4}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3">
                            Title
                        </InputGroup.Text>
                        <Form.Control id="basic-url" aria-describedby="basic-addon3"
                            name='title' onChange={handleUpdate} value={updateInput.title}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>Description</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="With textarea"
                            name='description' onChange={handleUpdate} value={updateInput.description}
                        />
                    </InputGroup>

                    <Form.Select name='priority' onChange={handleUpdate}>
                        <option value="High" selected={task.priority === 'High' ? true : false}>High</option>
                        <option value="Medium" selected={task.priority === 'Medium' ? true : false}>Medium</option>
                        <option value="Low" selected={task.priority === 'Low' ? true : false}>Low</option>
                    </Form.Select>

                    <Button className='m-3' variant="success"
                        onClick={() => onUpdate(id, updateInput, setIsUpdate)}>Save</Button>

                    <Button variant="danger"
                        onClick={() => setIsUpdate(false)}>Cancel</Button>
                </Col>
            )
    )
}

export default Task