/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import './notificationlist.css';
import { Link } from 'react-router-dom';
import logo from '../assests/logo.jpg';

const NotificationList: React.FC = () => {
    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('User is not authenticated');
                return;
            }

            try {
                const response = await fetch('http://localhost:8000/notifications/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Fetched Notifications:', data); 
                setNotifications(data || []);

                // if (Array.isArray(data)) {
                //     setNotifications(data);
                // } else {
                //     console.error('Fetched data is not an array:', data);
                // }
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    const handleMarkAsRead = async (id: number) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('User is not authenticated');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/notifications/${id}/read/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to mark notification as read');
            }

            setNotifications(prev =>
                prev.map(notification =>
                    notification.id === id ? { ...notification, is_read: true } : notification
                )
            );
        } catch (error) {
            console.error('Error marking notification as read:', error);
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
                      
                  </div>
                  </div>
        <div className="notification-list-container">
            <h2>Your Notifications</h2>
            {Array.isArray(notifications) && notifications.length > 0 ? (
                <ul>
                
                    {notifications.map(notification => (
                        <li key={notification.id} style={{ opacity: notification.is_read ? 0.6 : 1 }}>
                            <p className='note'>{notification.message}</p>
                            {/* Display worker's message if available */}
                            <p>
                            {notification.worker_message && (
                                <p className="message">{notification.worker_message}</p>
                            )}</p>
                            <p>Received at: {new Date(notification.created_at).toLocaleString()}</p>
                            {/* Check if worker exists before rendering link */}
                            {notification.worker ? (
                                <p>
                                    Worker: <Link to={`/profile/${notification.worker.unique_id}`}>{notification.worker.username}</Link>
                                </p>
                                
                            ) : (
                                <p>Worker information not available</p>
                            )}
                            <button onClick={() => handleMarkAsRead(notification.id)}>Mark as Read</button>
                        </li>
                    ))}
                </ul>
            ) : (
                    <p>No notifications available.</p>
                )}
            
        </div>
        <footer>
        <p className='tagline'>&copy;  In rememberance of Er. Bhim Pun, created by The Wolfpack. All Rights Reserved.</p>
    </footer>
        </div>
    );
};

export default NotificationList;
