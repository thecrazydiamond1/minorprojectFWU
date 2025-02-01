import React, { useState } from 'react';
 import './taskform.css';

const TaskForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const token = localStorage.getItem('token'); // Get the token from local storage

        if (!token) {
            alert('You need to log in to post a task.');
            return;
        }

        // Post the task to the backend
        try {
            const response = await fetch('http://localhost:8000/customer/tasks/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`, // Include the token in the header
                },
                body: JSON.stringify({ title, description }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Error: ${errorData.error || 'Failed to post task'}`);
                return;
            }

            setTitle('');
            setDescription('');
            alert('Task posted successfully!');
        } catch (error) {
            console.error('Error posting task:', error);
            alert('Failed to post task.');
        }
    };

    return (
        <div className="task-form-container">
            <h2>Post a Task</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task Title"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Task Description"
                    required
                />
                <button type="submit">Post Task</button>
            </form>
        </div>
    );
};

export default TaskForm;
