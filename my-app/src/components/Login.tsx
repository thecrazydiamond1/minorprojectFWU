import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/account/login/', { email, username, password });
      console.log('Login successful:', response.data);
  
      const token = response.data.token; 
      const isWorker = response.data.user?.is_worker; 
      const isClient = response.data.user?.is_client; 
  
      if (token) {
        localStorage.setItem('token', token);
        console.log('Token stored:', localStorage.getItem('token'));
  
        // Navigate based on user role
        if (isWorker) {
          navigate('/worker-dashboard');
        } else if (isClient) {
          navigate('/customer-dashboard');
        } else {
          setError('User role not recognized');
        }
      } else {
        setError('Token not received');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed');
    }
  };
  


  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/account/forgotpassword/', { email });
      console.log('Forgot password success:', response.data);
      setSuccess('OTP sent to your email');
      navigate('/resetpassword'); 
    } catch (error) {
      console.error('Forgot password failed:', error);
      setError('Forgot password failed');
    }
  };

  return (
    <div>
      {forgotPassword ? (
        <div className='forgot-password'>
          <h2>Forgot Password</h2>
          <form onSubmit={handleForgotPassword}>
            <div>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit">Send Reset Link</button>
          </form>
          {success && <p style={{ color: 'green' }}>{success}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      ) : (
        <div className='login-container'>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
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
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
                <input type="checkbox" id="remember-me" name="remember-me"/>
                        <label>Remember Me</label>
                    </div>
            <button type="submit">Login</button>
          </form>
          <button onClick={() => setForgotPassword(true)}>Forgot Password?</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
      )}
    </div>
  );
};

export default Login;




