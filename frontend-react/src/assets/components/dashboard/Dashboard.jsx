import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../AuthProvider";
import axiosInstance from '../../../axiosInstance'; 


const Dashboard = () => {
  const { isLogedin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isLogedin) {
      navigate('/');
    } else {
      // request intercepters
      axiosInstance.get('/protected') 
        .then(response => {
          setMessage(response.data.message);
        })
        .catch(error => {
          console.error('Failed to fetch protected data:', error);
          setMessage('Failed to load protected content.');
        });
    }
  }, [isLogedin, navigate]);

  return (
    <div>
      <p>{message || 'Loading...'}</p>
    </div>
  );
};

export default Dashboard;
