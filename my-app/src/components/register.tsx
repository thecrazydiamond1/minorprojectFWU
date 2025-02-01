/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from './assests/logo.jpg';
import fem from './assests/fem.png';
import lab from './assests/lab.png';
interface ApiErrorResponse {
  detail?: string;
  non_field_errors?: string[];
  [key: string]: any; // To handle other unexpected fields
}

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isWorker, setIsWorker] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Use navigation


  const handleWorkerChange = () => {
    setIsWorker(true);
    setIsClient(false); // Automatically deselect 'isClient'
  };

  const handleClientChange = () => {
    setIsClient(true);
    setIsWorker(false); // Automatically deselect 'isWorker'
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/account/register/', {
        username,
        email,
        password,
        password2,
        is_worker: isWorker,
        is_client: isClient,
        first_name:firstname,
        last_name:lastname
      });
      console.log('Registration successful:', response.data);
      alert('registration successful!');
      navigate('/'); 
      // Handle successful registration
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios error
        const axiosError = error as AxiosError<ApiErrorResponse>;
        const errorData = axiosError.response?.data;
        if (errorData) {
          let errorMessage = '';
        if (errorData.username) {
          errorMessage += `Username: ${errorData.username[0]} `;
        }
        if (errorData.email) {
          errorMessage += `Email: ${errorData.email[0]} `;
        }
        
          setError(errorData.detail || errorData.non_field_errors?.[0] || 'Registration failed');
        } else {
          setError('Registration failed');
          
        }
        console.error('Registration failed:', axiosError.response?.data || axiosError.message);
        alert('Your Username and Email must be Unique!!!');
      } else {
        // Handle other types of errors
        setError('Registration failed');
        console.error('Registration failed:', error);
      }
    }
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
                        <li><a href="/">Homepage</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li> <a href="#" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
                Go Back
            </a></li>
                        <li><a href="/faq">FAQS</a></li>
                        <li><a href="/how">How it Works?</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                    </ul>
                    <p>"Healthy home is happy home"</p>
                    {/* <p className='tagline'>In rememberance of Er. Bhim Pun, created by The WolfPack. </p> */}

                </div>
                </div>
      <div className="create-account1">
      <h1>Welcome To HomEase!!!</h1>
      <h2>Wanna Create an Account?</h2>
      <h3>Fill-up the Form.</h3>
      <form onSubmit={handleSubmit}>
        <div className="fillup">
        <div  >
          
          <input
            type="text"
            value={username}
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          
          <input
            type="text"
            placeholder='First Name'
            value={firstname}
            onChange={(e) => setfirstname(e.target.value)}
            required
          />
        </div>
        <div>
          
          <input
            type="text"
            placeholder='Last Name'
            value={lastname}
            onChange={(e) => setlastname(e.target.value)}
            required
          />
        </div>
        <div>
          
          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          
          <input
            type="password"
            placeholder='Confirm Password'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>
        </div>
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              checked={isWorker}
              onChange={handleWorkerChange} // Handle worker selection
            />
           Are you a Worker?
          </label>
          <label>
            <input
              type="checkbox"
              checked={isClient}
              onChange={handleClientChange}
            />
            
           Are you a Client?
          </label>
          </div>
          <div className="photo">
          <label>
          <img src={lab} height="300" alt="kto" />
          </label>
          <label>
          <img src={fem} height="300" alt="kt" />
          </label>
          </div>
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
      </form>
      </div>


  
    </div>
  );
};

export default Register;
