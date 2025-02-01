import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import './applicationform.css';

const ApplyForTask: React.FC<{ taskId: number; onApply: (taskId: number, message: string) => void; }> = ({ taskId, onApply }) => {
    const [message, setMessage] = useState<string>("");

    const handleApply = () => {
        onApply(taskId, message);
        setMessage(""); // Clear message after applying
    };

    return (
        <div className="apply-for-task">
            <input
                type="text"
                placeholder="Your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)} // Update the message state
            />
            <button onClick={handleApply}>Apply</button>
        </div>
    );
};

const ApplicationForm: React.FC = () => {
    const [tasks, setTasks] = useState<any[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('User is not authenticated');
                return;
            }

            try {
                const response = await fetch('http://localhost:8000/customer/tasks/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Fetched data:', data);
                setTasks(data || []);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const handleApply = async (taskId: number, message: string) => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('You need to log in to apply for tasks.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/worker/applications/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify({ task: taskId, message }), // Include the message
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Response details:', errorResponse);
                throw new Error('Failed to apply for the task');
            }

            alert('Applied for the task successfully!');
        } catch (error) {
            console.error('Failed to apply for the task:', error);
        }
    };

    return (
        <div className="application-form-container">
            <h2>Available Tasks</h2>
            {Array.isArray(tasks) && tasks.length > 0 ? (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <h3>{task.title}</h3>
                            <div className='description'> {task.description}</div> 
                            <p className='At'>Posted at: {new Date(task.created_at).toLocaleString()}</p>
                            {/* Add link to customer's profile */}
                            <p className='By'>
                                Posted by: <Link to={`/profile/${task.customer.unique_id}`}>{task.customer.username}</Link>
                            </p>
                            <p className='Apply'>
                            <ApplyForTask taskId={task.id} onApply={handleApply} /></p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='No'><h1>No tasks available.</h1></p>
            )}
        </div>
    );
};

export default ApplicationForm;
