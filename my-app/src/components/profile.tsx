/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import api from './api';
import { useNavigate, useParams } from 'react-router-dom';
import logo from './assests/logo.jpg';
import './profile.css';


const Profile: React.FC = () => {
  const navigate = useNavigate(); 
  const { uniqueId } = useParams<{ uniqueId: string }>();
  const [user, setUser] = useState<any>({
    username: '',
    email: '',
    profile_picture: null,
    password: '', 
    first_name:'',
    last_name:'' // Add password field
  });
  const [is_worker, setIsWorker] = useState(false);
  const [is_client, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get(uniqueId ? `/account/profile/${uniqueId}/` : '/account/profile/');
        console.log(response.data)
        setUser(response.data);
        setIsWorker(response.data.is_worker);
        setIsClient(response.data.is_client);

        const currentUserResponse = await api.get('/account/profile/');
        setIsOwner(currentUserResponse.data.unique_id === response.data.unique_id);
      } catch (err: any) {
        console.error(err.response || err);
        setError('Failed to load user profile.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [navigate, uniqueId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser: any) => ({
      ...prevUser,
      [name === 'first_name' ? 'first_name' : name === 'last_name' ? 'last_name' : name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]); 
    }
  };

  const handleWorkerChange = () => {
    setIsWorker(true);
    setIsClient(false);
  };

  const handleClientChange = () => {
    setIsClient(true);
    setIsWorker(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('first_name', user.first_name);
    formData.append('last_name', user.last_name);
    formData.append('email', user.email);
    formData.append('is_worker', is_worker.toString());
    formData.append('is_client', is_client.toString());
    if (file) {
      formData.append('profile_picture', file);
    }
    if (user.password) {
      formData.append('password', user.password);
    }

    try {
      const response=await api.put('http://localhost:8000/account/profile/', formData, {
        headers: {
          
          'Content-Type': 'multipart/form-data',
        },
      });
      setUser(response.data);
      alert('Profile updated successfully!');
     
      
      
    } catch (err) {
      console.error(err);
      setError('Failed to update profile.');
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/account/logout/');
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Failed to log out.');
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Toggle modal state
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="main">
      <div className='title'>
      <h1>{isOwner ? 'Your Profile' : `${user.username}'s Profile`}</h1> </div>
      <div className="Profilepic">
        {user.profile_picture && (
          <img 
            src={`http://127.0.0.1:8000${user.profile_picture}`} 
            height={200} 
            alt="profile" 
            onClick={toggleModal} // Open modal on image click
            style={{ cursor: 'pointer' }} 
          />
        )}
      </div>

      {/* Modal for full view */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>&times;</span>
            <img
              src={`http://127.0.0.1:8000${user.profile_picture}`}
              alt="Full view"
              className="full-view-image"
            />
          </div>
        </div>
      )}

      <div className="navbar">
        <div className="icon">
          <img src={logo} height="200" alt="Logo" />
          <h1 className="logo">HomEase</h1>
        </div>
        {isOwner===is_client &&
        <div className="menu">
          <ul>
          <li><a href="/customer-dashboard">Customer Dashboard</a></li>
            <li><a href="/notifications">Notifications</a></li>
            <li><a href="/testimonials">Testimonials</a></li>
            <li> <a href="#" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
                Go Back
            </a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/faq">FAQS</a></li>
            <li><a href="/how">How it Works?</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
          <p>"Healthy home is happy home"</p>
          {/* <p className='tagline'>In rememberance of Er. Bhim Pun, created by The WolfPack. </p> */}
        </div>}
        {isOwner===is_worker &&
        <div className="menu">
          <ul>
          <li><a href="/worker-dashboard">Worker Dashboard</a></li>
          {/* <li><a href="/notifications">Notifications</a></li> */}
            <li><a href="/testimonials">Testimonials</a></li>
            <li> <a href="#" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
                Go Back
            </a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/faq">FAQS</a></li>
            <li><a href="how">How it Works?</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
          <p>"Healthy home is happy home"</p>
          {/* <p className='tagline'>In rememberance of Er. Bhim Pun, created by The WolfPack. </p> */}
          
        </div>}



      </div>

      <form onSubmit={handleUpdate}>
        <div className="Form">
          <div className="Profileusername">
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={user.username || 'N/A'}
                onChange={handleChange}
                readOnly={!isOwner}
              />
            </label>
          </div>
          <div className="Profilefirstname">
            <label>
              First Name:
              <input
                type="text"
                name="first_name"
                value={user.first_name}
                onChange={handleChange}
                readOnly={!isOwner}
              />
            </label>
          </div>
          <div className="Profilelastname">
            <label>
              Last Name:
              <input
                type="text"
                name="last_name"
                value={user.last_name}
                onChange={handleChange}
                readOnly={!isOwner}
              />
            </label>
          </div>
          <div className="Profileemail">
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                readOnly={!isOwner}
              />
            </label>
          </div>
          <div className="Profilepassword">
            {isOwner && (
              <label>
                New Password:
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current password"
                />
              </label>
            )}
          </div>

        </div>
        <div className="Profilecheckbox">
          <label>
            Is Worker:
            <input
              type="checkbox"
              name="is_worker"
              checked={is_worker}
              onChange={handleWorkerChange}
              disabled={!isOwner}
            />
          </label>
          <label>
            Is Client:
            <input
              type="checkbox"
              name="is_client"
              checked={is_client}
              onChange={handleClientChange}
              disabled={!isOwner}
            />
          </label>
        </div>

        <div className="profilebutton">
          {isOwner && <button type="submit">Update Profile</button>}
        </div>
      </form>
      {isOwner &&
      <form onSubmit={handleUpdate}>
      <div className="update">
      <div className="Profilepicture">
            {isOwner && (
              <label>
                Profile Picture:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>
          <div className="picbutton">
          {isOwner && <button type="submit">Update Profile Picture</button>}
        </div>
        </div>
        </form>}
       

      <div className="logoutbutton">
        {isOwner && <button onClick={handleLogout}>Logout</button>}
      </div>
           <footer>
        <p className='tagline'>&copy;  In rememberance of Er. Bhim Pun, created by The Wolfpack. All Rights Reserved.</p>
    </footer>
    </div>
  );
};

export default Profile;
function fetchUserProfile() {
  throw new Error('Function not implemented.');
}

