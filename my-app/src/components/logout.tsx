/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import { useNavigate } from 'react-router-dom'; 

const navigate = useNavigate();
const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login or another page after logout
  };
  