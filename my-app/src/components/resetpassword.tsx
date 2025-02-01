/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from './assests/logo.jpg';
import './reset.css';

const ResetPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate(); // Use navigation



const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/account/verify-otp/', { email, otp });
      setSuccess('OTP verified. You can now reset your password.');
    } catch (error: any) {
      console.error('Verify OTP failed:', error.response?.data || error);
      setError('Verify OTP failed');
    }
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/account/reset-password/', { email:email, otp:otp, new_password: newPassword });
      setSuccess('Password reset successfully.');
      alert('password reset successful!');
      navigate('/'); 
    } catch (error: any) {
      console.error('Reset password failed:', error.response?.data || error);
      setError('Reset password failed');
    }
  };


  return (
    <div className='main1'>

<div className="navbar">
                <div className="icon">
                    <img src={logo} height="200" alt="Logo" />
                    <h1 className="logo">HomEase</h1>
                </div>

                <div className="menu">
                    <ul>
                        <li><a href="/">Homepage</a></li>
                    </ul>
                    <p>"Healthy home is happy home"</p>
                    {/* <p className='tagline'>In rememberance of Er. Bhim Pun, created by The WolfPack. </p> */}
                </div>
            </div>

      <div className='verification'>
      <h2>Verify OTP</h2>
      <form onSubmit={handleVerifyOtp}>
       
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        
        {/*<button type="submit">Verify OTP</button>*/}
      </form>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Reset Password</h3>
      <form onSubmit={handleResetPassword}>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className='sub'>
        <button type="submit">Reset Password</button></div>
      </form>
      </div>

      <footer>
        <p className='tagline'>&copy;  In rememberance of Er. Bhim Pun, created by The Wolfpack. All Rights Reserved.</p>
    </footer>
    </div>
  );
};

export default ResetPassword;

  