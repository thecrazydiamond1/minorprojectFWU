/* eslint-disable jsx-a11y/anchor-is-valid */
// import React from 'react';
// import TaskForm from '../taskform/taskform';
// import './customerdashboard.css';

// const CustomerDashboard: React.FC = () => {
//     return (
//         <div className="customer-dashboard">
//             <h2>Customer Dashboard</h2>
//             <TaskForm />
//         </div>
//     );
// };

// export default CustomerDashboard;
import React, { useState } from 'react';
import TaskForm from '../taskform/taskform';
 import './customerdashboard.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assests/logo.jpg';
import rectangle from "../assests/rectangle.jpg";
const CustomerDashboard: React.FC = () => {
    const [showTaskForm, setShowTaskForm] = useState(false);
    const navigate = useNavigate(); 


    const handleShowTaskForm = () => {
        setShowTaskForm(true);
    };

    // const handleShowNotifications = () => {
    //     // Logic to show notifications can go here
    //     navigate('/notifications');
    // };
    

    const handleShowProfile = () => {
        // Logic to show notifications can go here
        navigate('/profile/');
    };
    return (
        <div  className="main">
        <div className="navbar">
        <div className="icon">
        <img src={logo} height="200" alt="Logo" />
                    <h1 className="logo">HomEase</h1>
                </div>
                <div className="menu">
                    <ul>
                        <li><a href="/customer-dashboard">Customer Dashboard</a></li>
                        <li><a href="/notifications">Notifications</a></li>
                        <li><a href="/testimonials">Testimonials</a></li>
                        
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/faq">FAQS</a></li>
                        <li><a href="/how">How it Works?</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                    </ul>
                    <p>"Healthy home is happy home"</p>
                    {/* <p className='tagline'>In rememberance of Er. Bhim Pun, created by The WolfPack. </p> */}
                </div>
                </div>
              

        <div className="customer-dashboard">
            <h1>Welcome to Customer HomeBoard</h1>
            <div className="button-container">
                {/* <button className="dashboard-button" onClick={handleShowNotifications}>Notifications</button> */}
                <button className="dashboard-button" onClick={handleShowTaskForm}>Post a Task</button>
                <button className="dashboard-button" onClick={handleShowProfile}>Your Profile</button>
            </div>
            <div className="handshake">
                <img src={rectangle} height={531.5} alt="Rectangle" />
                </div>
            
            {showTaskForm && <TaskForm />}
        </div>
        <footer>
        <p className='tagline'>&copy;  In rememberance of Er. Bhim Pun, created by The Wolfpack. All Rights Reserved.</p>
    </footer>
        </div>
    );
};

export default CustomerDashboard;
