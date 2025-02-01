/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import api from '../api'; // Assuming you have api.js for making requests
import { Link } from 'react-router-dom';
import logo from '../assests/logo.jpg';
import './testimonials.css';

interface Testimonial {
  user: any;
  id: number;
  username: string; // Updated to reflect API response
  content: string;
  rating: number;
  created_at: string;
}

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [newTestimonial, setNewTestimonial] = useState({ content: '', rating: 5 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  

  // Fetch existing testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get('testimonials/');
        console.log(response.data); // Log the response to check its structure
        setTestimonials(response.data);
      } catch (err: any) {
        console.error(err);
        setError('Failed to load testimonials.');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Handle testimonial form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTestimonial((prev) => ({ ...prev, [name]: value }));
  };

  // Handle new testimonial submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('testimonials/', newTestimonial);
      setTestimonials([response.data, ...testimonials]); // Add new testimonial to list
      setNewTestimonial({ content: '', rating: 5 });     // Reset form
      alert('Testimonial submitted!');
    } catch (err: any) {
      console.error(err);
      setError('Failed to submit testimonial.');
    }
  };

  if (loading) return <div>Loading testimonials...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='main'>
      <div className="navbar">
        <div className="icon">
                      <img src={logo} height="200" alt="Logo" />
                      <h1 className="logo">HomEase</h1>
                  </div>
                  <div className="menu">
                      <ul>
                          <li><a href="/profile">Profile</a></li>
                          <li><a href="/testimonials">Testimonials</a></li>
                         <li> <a href="#" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
                Go Back
            </a></li>
                          <li><a href="/about">About Us</a></li>
                          <li><a href="faq">FAQS</a></li>
                          <li><a href="/how">How it Works?</a></li>
                          <li><a href="/contact">Contact Us</a></li>
                      </ul>
                      <p>"Healthy home is happy home"</p>
                      {/* <p className='tagline'>In rememberance of Er. Bhim Pun, created by The WolfPack. </p> */}
                  </div>
                  </div>
      <h1 className='test'>Testimonials</h1>
      <div className="testimonial-section">

{/* Testimonial Form */}
<form onSubmit={handleSubmit} className="testimonial-form">
  <div>
    <label>Content:</label>
    <textarea
      name="content"
      value={newTestimonial.content}
      onChange={handleChange}
      required
    />
  </div>
  <div>
    <label>Rating:</label>
    <input
      type="number"
      name="rating"
      value={newTestimonial.rating}
      onChange={handleChange}
      min="0"
      max="10"
      required
    />
  </div>
  <button type="submit">Submit Testimonial</button>
</form>

{/* Display List of Testimonials */}
<div className="testimonials-list">
  <ul>
    {testimonials.map((testimonial) => (
      <li key={testimonial.id}>
        <p>
          <strong>
            <Link to={`/profile/${testimonial.user.unique_id}`}>
              {testimonial.user.username}
            </Link>
            :
          </strong> {testimonial.content} (Rating: {testimonial.rating})
          <br />
          <small>Posted on {new Date(testimonial.created_at).toLocaleString()}</small>
        </p>
      </li>
    ))}
  </ul>
</div>
</div>
<footer>
        <p className='tagline'>&copy;  In rememberance of Er. Bhim Pun, created by The Wolfpack. All Rights Reserved.</p>
    </footer>
      
    </div>
  );
};

export default Testimonials;
