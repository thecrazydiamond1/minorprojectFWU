/* eslint-disable jsx-a11y/anchor-is-valid */
// src/components/HomePage.tsx
import React, { useState } from 'react';
import './homepage.css'; // Ensure your CSS file is imported
import Login from './Login'; // Import the Login component
import logo from './assests/logo.jpg';
import rectangle from "./assests/rectangle.jpg";

const HomePage: React.FC = () => {
    const [showLogin, setShowLogin] = useState<boolean>(false);

    return (
        <div className="main">
            <div className="navbar">
                <div className="icon">
                    <img src={logo} height="200" alt="Logo" />
                    <h1 className="logo">HomEase</h1>
                </div>

                <div className="menu">
                    <ul>
                        <li><a href="/">Homepage</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/faq">FAQS</a></li>
                        <li><a href="/how">How it Works?</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                    </ul>
                    <p className='healthy'>"Healthy home is happy home"</p>
                    
                </div>
            </div>

            <div className="upper">
                <p id="id1">Need Work? Need a Worker? We Connect Both!</p>
                <p id="id2">Your Go-To Platform for Finding Skilled Workers and Job Opportunities</p>
                
                <img src={rectangle} height={531.5} alt="Rectangle" />
            </div>

            <div className="content">
            <p>WE CAN HELP YOU!</p>
                <h1>WELCOME TO<br />HomEase</h1>
                <p>where your search ends and new opportunities begin.</p>
            </div>

            {/* Show the Login component if showLogin is true */}
            {showLogin ? (
                <Login />
            ) : (
                <div className="login-container">
                    <h3>Want to Login?</h3>
                    <button onClick={() => setShowLogin(true)}>Login</button>
                </div>
            )}

            <div className="create-account">
                <p className="par">
                    Need a reliable professional to tackle your home projects?
                    Or<br /> you a skilled worker looking for your next job? We've got<br />
                    you covered. Why struggle to find help or work when you can<br />
                    connect with the best right here? Dive into a seamless<br />
                    experience where finding trustworthy workers and exciting<br />
                    job opportunities is just a click away. Join us today and see<br />
                    how easy it can be!
                </p>
                <button className="create-account-button" onClick={() => window.location.href='/register'}>
                    Create Account
                </button>
            </div>
            <footer>
        <p className='tagline'>&copy;  In rememberance of Er. Bhim Pun, created by The Wolfpack. All Rights Reserved.</p>
    </footer>
            {/* Ionicons script can be included in index.html or via npm package */}
        </div>
    );
};

export default HomePage;