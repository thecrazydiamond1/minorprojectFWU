/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import './howitworks.css'; // Create a CSS file to style the page.
import logo from './assests/logo.jpg';

const HowItWorks: React.FC = () => {
    return (
        <><div className="navbar">
            <div className="icon">
                <img src={logo} height="200" alt="Logo" />
                <h1 className="logo">HomEase</h1>
            </div>

            <div className="menu">
                <ul>
                <li><a href="/profile">Profile</a></li>
                    <li> <a href="#" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
                Go Back
            </a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/faq">FAQS</a></li>
                    <li><a href="/how">How it Works?</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                </ul>
                <p>"Healthy home is happy home"</p>
                {/* <p>In rememberance of Er. Bhim Pun, created by The WolfPack. </p> */}
            </div>
        </div> <div className="how-it-works-container">
            <div className="header">
                <h1>How HomEase Works?</h1>
                <p>HomEase makes it easy for customers and workers to connect and get tasks done efficiently.</p>
            </div>

            <div className="steps-section">
                <h2>For Customers</h2>
                <div className="steps">
                    <div className="step">
                        <h3>1. Register and Post a Task</h3>
                        <p>
                            Sign up as a customer and post the tasks you need assistance with. Provide all relevant details such as task description, location, and deadline to ensure workers understand the requirements.
                        </p>
                    </div>

                    <div className="step">
                        <h3>2. Review Worker Applications</h3>
                        <p>
                            Once you post a task, workers can apply for it. You’ll receive notifications when workers apply, and you can review their profiles and work experience.
                        </p>
                    </div>

                    <div className="step">
                        <h3>3. Select a Worker</h3>
                        <p>
                            Choose the best worker for your task based on their experience, profile, and ratings. The system helps you match with workers who suit your needs.
                        </p>
                    </div>

                    <div className="step">
                        <h3>4. Task Completion</h3>
                        <p>
                            Once the worker completes the task, you can leave feedback for the HomEase platform about your experience. This helps improve the platform and services for future tasks.
                        </p>
                    </div>
                </div>
            </div>

            <div className="steps-section">
                <h2>For Workers</h2>
                <div className="steps">
                    <div className="step">
                        <h3>1. Register and Build Your Profile</h3>
                        <p>
                            Sign up as a worker and create a profile that highlights your skills and expertise. This helps customers find qualified workers for their tasks.
                        </p>
                    </div>

                    <div className="step">
                        <h3>2. Browse Tasks and Apply</h3>
                        <p>
                            After building your profile, browse through the tasks posted by customers that match your skills. You can apply for the ones that interest you by submitting an application with relevant information.
                        </p>
                    </div>

                    <div className="step">
                        <h3>3. Get Selected and Complete the Task</h3>
                        <p>
                            If the customer selects your application, proceed with the task. Complete it according to the customer’s requirements, ensuring quality work.
                        </p>
                    </div>

                    <div className="step">
                        <h3>4. Receive Platform Feedback</h3>
                        <p>
                            Customers leave feedback about their experience with the task through the HomEase platform. This feedback helps improve your profile and increases your chances of getting future tasks.
                        </p>
                    
                    </div>
                    <div className="step">
                        <p className="more-info">For more information, <a href="/contact">Contact Us</a>.</p>
                        </div>
                </div>
            </div>

            <footer>
        <p className='tagline'>&copy;  In rememberance of Er. Bhim Pun, created by The Wolfpack. All Rights Reserved.</p>
    </footer>
        </div></>
    );
};

export default HowItWorks;
