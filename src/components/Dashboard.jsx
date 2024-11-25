import React, { useEffect } from 'react';
import axios from 'axios';
import Navbar from './NavBar'; 

const Dashboard = () => {
 
const userDetails = sessionStorage.getItem('user');
console.log(JSON.parse(userDetails).name);
const username = JSON.parse(userDetails);
  const allGroups = async () => {
    const data = await axios.get(import.meta.env.VITE_BACKEND_URL + 'getall_groups/');
    // console.log(data.name);

    return data;
  };

  useEffect(() => {
    allGroups();
  }, []);

  return (
    <div>
      <Navbar userInfo={username} />
      <div className="p-4">
        Dashboard
      </div>
    </div>
  );
};

export default Dashboard;
