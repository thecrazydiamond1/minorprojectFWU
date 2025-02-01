/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import ApplicationForm from '../applicationform/applicationform';
import './workerdashboard.css';
import logo from '../assests/logo.jpg';
import rectangle from "../assests/rectangle.jpg";
import { useNavigate } from 'react-router-dom';
import  { useState } from 'react';
const WorkerDashboard: React.FC = () => {
    const [showApplication, setShowApplication] = useState(false);
    const navigate = useNavigate(); 
    const handleShowProfile = () => {
        // Logic to show notifications can go here
        navigate('/profile');
    };
    const handleShowApplication = () => {
        setShowApplication(true);
    };
    return (
        <><div  className="main"> 
           <div className="navbar">
            <div className="icon">
                <img src={logo} height="200" alt="Logo" />
                <h1 className="logo">HomEase</h1>
            </div>
            <div className="menu">
                <ul>
                    <li><a href="/worker-dashboard">Worker Dashboard</a></li>
                    <li><a href="/testimonials">Testimonials</a></li>
                     
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/faq">FAQS</a></li>
                    <li><a href="/how">How it Works?</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                </ul>
                <p>"Healthy home is happy home"</p>
                {/* <p className='tagline'>In rememberance of Er. Bhim Pun, created by The WolfPack. </p> */}
            </div>
        </div><div className="worker-dashboard">
                <h1>Welcome To Worker HomeBoard</h1>
                <div className="button-container">
                <button className="dashboard-button" onClick={handleShowApplication}>Show Tasks</button>

                    <button className="dashboard-button" onClick={handleShowProfile}>Your Profile</button>

                </div>
                <div className="handshake1">
                    <img src={rectangle} height={531.5} alt="Rectangle" />
                </div>
                {showApplication&&<ApplicationForm />}
            </div>
            <footer>
        <p className='tagline'>&copy;  In rememberance of Er. Bhim Pun, created by The Wolfpack. All Rights Reserved.</p>
    </footer>
            
            </div></>
    );
};

export default WorkerDashboard;
