/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import './faq.css'; // Ensure you create this file for the styling
import logo from './assests/logo.jpg';

const FAQ: React.FC = () => {
    return (
        <><div className="navbar">
            <div className="icon">
                <img src={logo} height="200" alt="Logo" />
                <h1 className="logo">HomEase</h1>
            </div>

            <div className="menu">
                <ul>
                    <li><a href="/profile">Profile</a></li>
                    <li> <a href="#" onClick={(e) => { e.preventDefault(); window.history.back(); } }>
                        Go Back
                    </a></li>

                    <li><a href="/about">About Us</a></li>
                    <li><a href="/faq">FAQS</a></li>
                    <li><a href="/how">How it Works?</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                </ul>
                <p>"Healthy home is happy home"</p>
            </div>
        </div><div className="faq-container">
                <h1>Frequently Asked Questions</h1>
                <div className="faq-section">
                    <h3>1. What is HomEase?</h3>
                    <p>
                        HomEase is an online platform that connects homeowners and businesses with skilled workers
                        for various home improvement tasks, repairs, and services. Customers can post tasks, and workers
                        can apply for jobs that match their skills.
                    </p>
                </div>

                <div className="faq-section">
                    <h3>2. How do I sign up?</h3>
                    <p>
                        Signing up is easy! Simply click on the "Sign Up" button on our homepage.
                        You can register either as a customer (if you need work done) or as a worker (if you offer services).
                    </p>
                </div>

                <div className="faq-section">
                    <h3>3. Is HomEase free to use?</h3>
                    <p>
                        Yes, HomEase is free for customers to post tasks and for workers to browse tasks.
                        However, workers may be charged a small fee when they apply for a task or get hired.
                    </p>
                </div>

                <div className="faq-section">
                    <h3>4. How can I post a task as a customer?</h3>
                    <p>
                        Once you've signed up as a customer, you can post a task by navigating to the "Post a Task" section.
                        Fill out the required details, such as the type of work, location, and any specific requirements.
                        Workers will then apply for the task, and you can choose the best candidate for the job.
                    </p>
                </div>

                <div className="faq-section">
                    <h3>5. How do I apply for tasks as a worker?</h3>
                    <p>
                        After signing up as a worker, you can browse available tasks posted by customers.
                        When you find a task that matches your skills, you can apply by filling out an application
                        form and submitting it to the customer for review.
                    </p>
                </div>



                <div className="faq-section">
                    <h3>6. How can I trust the workers on HomEase?</h3>
                    <p>
                        All workers are required to complete a profile and undergo a verification process.
                        Customers can also view worker profiles.
                    </p>
                </div>

                <div className="faq-section">
                    <h3>7. How do testimonials work on HomEase?</h3>
                    <p>
                        Testimonials are provided by users to share their overall experience with the platform.
                        They are not tied to a specific person but reflect the service quality and ease of use
                        that HomEase offers.
                    </p>
                </div>


                <footer>
        <p className='tagline'>&copy;  In rememberance of Er. Bhim Pun, created by The Wolfpack. All Rights Reserved.</p>
    </footer>

            </div></>
    );
};

export default FAQ;
