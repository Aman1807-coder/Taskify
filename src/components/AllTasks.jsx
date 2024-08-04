import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import InputTask from './InputTask';
import Task from './Task';
import { useFirebase } from '../context/firebase';

const AllTasks = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    const getAllTasks = async () => {
        try {
            const res = await firebase.listAllTasks()
            setTasks(res.docs)
        } catch (error) {
            alert(error)
        }
    }

    const handleTasks = async (input, setInput) => {
        try {
            const res = await firebase.handleTaskAdd(
                input.title, input.description, input.priority
            );

            getAllTasks();
            setInput({ title: "", description: "", priority: "High" });
        } catch (error) {
            alert(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            const res = await firebase.handleTaskDelete(id);
            getAllTasks();
        } catch (error) {
            alert(error)
        }
    }

    const handleUpdates = async (id, updateInput, setIsUpdate) => {
        try {
            const res = await firebase.handleTaskUpdate(
                id, updateInput.title, updateInput.description, updateInput.priority
            );
            getAllTasks();
            setIsUpdate(false)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        if (!firebase.isLoggedIn) navigate('/signin');
        getAllTasks();
    }, []);

    return (
        <div>
            <InputTask onTaskAdd={handleTasks} />
            <Container>
                <Row>
                    {
                        tasks.length > 0 && tasks.map((task) => {
                            return <Task
                                key={task.id}
                                id={task.id}
                                task={task.data()}
                                onDelete={handleDelete}
                                onUpdate={handleUpdates}
                            />
                        })
                    }
                </Row>
            </Container>

        </div>
    )
}

export default AllTasks