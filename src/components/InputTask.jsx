import React, { useState } from 'react'

const InputTask = (props) => {
    const [input, setInput] = useState({
        title: '', description: '', priority: 'High'
    });

    const handleInput = (event) => {
        const {name, value} = event.target;
        setInput((prev) => ({...prev, [name]: value}));
    }

    return (
        <div>
            <input type='text' name='title' placeholder='Enter Title'
                onChange={handleInput} value={input.title}
            />

            <input type='text' name='description' placeholder='Enter Description'
                onChange={handleInput} value={input.description}
            />

            <select name='priority' onChange={handleInput}>
                <option value='High'>High</option>
                <option value='Medium'>Medium</option>
                <option value='Low'>Low</option>
            </select>

            <button onClick={() => props.onTaskAdd(input, setInput)}>Add Task</button>
        </div>
    )
}

export default InputTask