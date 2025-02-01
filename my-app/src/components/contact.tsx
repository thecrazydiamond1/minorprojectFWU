/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import axios from "axios";
import "./contact.css";
import logo from './assests/logo.jpg'


    const ContactUs: React.FC = () => {
       
        const [email, setEmail] = useState("");
        const [message, setMessage] = useState("");
        const [responseMessage, setResponseMessage] = useState("");
    
        const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
        
            const formData = {
                 
                email: event.currentTarget.email.value,
                message: event.currentTarget.message.value,
            };
        
            try {
                const response = await fetch('http://localhost:8000/contact/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
        
                if (response.ok) {
                    console.log('Message sent successfully');
                    alert('Message sent successfully');
                } else {
                    const errorData = await response.json();  // Parse error details
                    console.error('Error sending message:', errorData);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        
                             

    return (
        <><div className="container2">
            <div className="navbar">
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
            </div>

            <div className="main-content">
                <h2>Contact Us</h2>
                <p>Don't be afraid to reach out. You + Us = Awesome.</p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required />
                    <textarea
                        name="message"
                        rows={5}
                        placeholder="Message"
                        required />
                    <button type="submit">Submit</button>
                </form>

                <div className="contact-info">
                    <p>📞 +977 9848025558</p>
                    <p>📞 +977 9840042899</p>
                    <p>📞 +977 9810771517</p>
                    <p>📞 +977 9841822257</p>
                    <p>📞 +977 9810770016</p>
                    <p>📧 joshijeewon@gmail.com</p>
                    <p>📧 baduanita32@gmail.com</p>
                    <p>📧 prabhajoc586@gmail.com</p>
                    <p>📧 sumandhanuk77@gmail.com</p>
                </div>

                <div className="social-media">
                    <p>Also check us out at:</p>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                    <a href="https://www.facebook.com/profile.php?id=100070286719334" className="fa fa-facebook"></a>
                    <a href="https://www.instagram.com/_kaushik.0110_/" className="fa fa-instagram"></a>
                    <a href="#" className="fa fa-linkedin"></a>
                </div>
            </div>

        </div><footer>
                <p className='tagline'>&copy;  In rememberance of Er. Bhim Pun, created by The Wolfpack. All Rights Reserved.</p>
            </footer></>
    );
};

export default ContactUs;
