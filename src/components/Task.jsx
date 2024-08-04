import React, { useState } from 'react'

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
            (<div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>{task.priority}</p>
                <button onClick={() => setIsUpdate(true)}>Update</button>
                <button onClick={() => onDelete(id)}>Delete</button>
            </div>) : (
                <div>
                    <input type='text' name='title' placeholder='Enter Title'
                        onChange={handleUpdate} value={updateInput.title}
                    />

                    <input type='text' name='description' placeholder='Enter Description'
                        onChange={handleUpdate} value={updateInput.description}
                    />

                    <select name='priority' onChange={handleUpdate}>
                        <option value='High' selected={task.priority === 'High' ? true : false}>High</option>
                        <option value='Medium' selected={task.priority === 'Medium' ? true : false}>Medium</option>
                        <option value='Low' selected={task.priority === 'Low' ? true : false}>Low</option>
                    </select>

                    <button onClick={() => onUpdate(id, updateInput, setIsUpdate)}>Save</button>
                </div>
            )
    )
}

export default Task