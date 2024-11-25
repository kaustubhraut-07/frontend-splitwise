import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './NavBar'; 
import CreateGroup from './CreateGroup';

const Dashboard = () => {
 const [grooups , setGroups] = useState([]);
const userDetails = sessionStorage.getItem('user');
console.log(JSON.parse(userDetails).name);
const username = JSON.parse(userDetails);
  const allGroups = async () => {
    const data = await axios.get(import.meta.env.VITE_BACKEND_URL + 'getall_groups/');
    // console.log(data.name);

    return data;
  };


  const getAllGroupsList = async () => {
    try{
        const data = await axios.get(import.meta.env.VITE_BACKEND_URL + `get_group_user_present/${username.id}/`);
        console.log(data);

    }catch(e){
        console.log(e);
    }
  }
  useEffect(() => {
    allGroups();
    getAllGroupsList();
  }, []);

  return (
    <div>
      <Navbar userInfo={username} />
      <CreateGroup/>
      
    </div>
  );
};

export default Dashboard;
