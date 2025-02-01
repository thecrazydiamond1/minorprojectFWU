/* eslint-disable no-template-curly-in-string */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/register';
import PostForm from './components/post';
import ResetPassword from './components/resetpassword';
import ProtectedRoute from './components/ProtectedRoute';  // Import the ProtectedRoute component
import CustomerDashboard from './components/customerdashboard/customerdashboard'; // Import CustomerDashboard
import WorkerDashboard from './components/workerdashboard/workerdashboard'; // Import WorkerDashboard
import NotificationList from './components/notificationlist/notificationlist'; // Import NotificationList
import './App.css'; 
import Profile from './components/profile';
import Testimonials from './components/testimonials/testimonial';
import HomePage from './components/homepage';
import ContactUs from './components/contact';
import HowItWorks from './components/howitworks';
import AboutUs from './components/about';
import FAQ from './components/faq';


const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post" element={<PostForm />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/how" element={<HowItWorks />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/faq" element={<FAQ />} />

          <Route path="/profile/:uniqueId" element={<Profile />} />
          
          {/* Protected Routes */}
          <Route
            path="/customer-dashboard"
            element={
              <ProtectedRoute>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/worker-dashboard"
            element={
              <ProtectedRoute>
                <WorkerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <NotificationList />
              </ProtectedRoute>
            }
          />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
