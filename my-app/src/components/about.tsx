/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import './about.css'; // Ensure you create this file for the styling
import logo from './assests/logo.jpg'
import shishir from './assests/shishir.jpg'
import anita from './assests/anita.png'
import suman from'./assests/Suman.jpg'
import jeevan from './assests/Jeevan.jpg'
import prabha from './assests/prabha1.jpg'
import sir from './assests/sir.jpg'


const AboutUs: React.FC = () => {
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
                {/* <p className='tagline'>In rememberance of Er. Bhim Pun, created by The WolfPack. </p> */}
            </div>
        </div><div className="about-container">
                <section className="about-header">
                    <h1>About HomEase</h1>
                    <p>
                        HomEase is your go-to platform for connecting skilled workers with homeowners and businesses.
                        Our mission is to make home maintenance and improvement simple, reliable, and efficient.
                    </p>
                </section>

                <section className="about-details">
                    <h2>What We Do</h2>
                    <p>
                        Whether you're a customer looking for professionals to help with repairs, renovations, or
                        installations, or you're a skilled worker looking for job opportunities, HomEase provides
                        a platform to match the right people to the right jobs.
                    </p>
                </section>

                <section className="how-it-works">
                    <h2>How It Works</h2>
                    <div className="steps">
                        <div className="step">
                            <h3>For Customers</h3>
                            <p>Sign up and post the details of the task you need help with. Browse workers' profiles and review applications.</p>
                        </div>
                        <div className="step">
                            <h3>For Workers</h3>
                            <p>Sign up and complete your profile. Browse available tasks and apply to the ones that match your skills.</p>
                        </div>
                    </div>
                </section>

                <section className="about-team">
                    <h2>Meet the Team</h2>
                    <div className="team-members">

                    <div className="member">
                            <img src={sir} alt="Team Member" />
                            <h3>Er. Bhim Bdr. Pun</h3>
                            <p>The Mentor and Supervisor</p>
                            
                        </div>
                        <div className="member">
                            <img src={jeevan} alt="Team Member" />
                            <h3>Jeevan Joshi</h3>
                            <p>Team leader and Handled the Backend</p>
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                            <a href="https://www.facebook.com/profile.php?id=100070286719334"  className="fa fa-facebook"></a>
                            <a href="https://www.instagram.com/_kaushik.0110_/" className="fa fa-instagram"></a>
                        </div>
                        <div className="member">
                            <img src={prabha} alt="Team Member" />
                            <h3>Prabha Joshi</h3>
                            <p>Ui/Ux Designer </p>
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                            <a href="https://www.facebook.com/profile.php?id=100089914645581"  className="fa fa-facebook"></a>
                            
                        </div>
                        <div className="member">
                            <img src={anita} alt="Team Member" />
                            <h3>Anita Badu</h3>
                            <p>Handled the Frontend </p>
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                            <a href="https://www.facebook.com/aakanshya.badu"  className="fa fa-facebook"></a>
                            
                        </div>
                        <div className="member">
                            <img src={suman} alt="Team Member" />
                            <h3>Suman Dhanuk</h3>
                            <p>Handled the Frontend </p>
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                            <a href="https://www.facebook.com/suman.dhanuk.17"  className="fa fa-facebook"></a>
                            <a href="https://www.instagram.com/sumandhanuk77/" className="fa fa-instagram"></a>
                        </div> <div className="member">
                            <img src={shishir} alt="Team Member" />
                            <h3>Shishir Khanal</h3>
                            <p>Handled the Frontend </p>
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                            <a href="https://www.facebook.com/shishir.khanal.921"  className="fa fa-facebook"></a>
                        </div>
                        {/* Add more team members as necessary */}
                    </div>
                </section>

                <footer>
        <p className='tagline'>&copy;  In rememberance of Er. Bhim Pun, created by The Wolfpack. All Rights Reserved.</p>
    </footer>
            </div></>
    );
};

export default AboutUs;
