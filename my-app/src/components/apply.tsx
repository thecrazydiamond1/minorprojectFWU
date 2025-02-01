import React, { useState } from 'react';
import './homepage.css';

interface ApplyForTaskProps {
    taskId: number;
    onSuccess: () => void;  // Callback function for success
}

const ApplyForTask: React.FC<ApplyForTaskProps> = ({ taskId, onSuccess }) => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const applyForTask = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:8000/notifications/tasks/${taskId}/apply/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error('Failed to apply for the task');
            }

            // Call the onSuccess callback if the application is successful
            onSuccess();
            setMessage('');  // Clear the message input
            setError('');    // Clear any previous error
        } catch (error:any) {
            setError(error.message);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();  // Prevent default form submission
        applyForTask();
    };

    return (
        <div className='Apply'>
            <h3>Apply for Task {taskId}</h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={message}
                    rows={100}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here..."
                    required
                />
                <button type="submit">Apply</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message */}
        </div>
    );
};

export default ApplyForTask;
