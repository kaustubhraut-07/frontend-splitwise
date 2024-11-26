import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './NavBar'; 
import CreateGroup from './CreateGroup';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
 const [grooups , setGroups] = useState([]);
const userDetails = sessionStorage.getItem('user');
console.log(JSON.parse(userDetails).name);
const username = JSON.parse(userDetails);

const navigate = useNavigate();
  const allGroups = async () => {
    const data = await axios.get(import.meta.env.VITE_BACKEND_URL + 'getall_groups/');
    // console.log(data.name);

    return data;
  };


  const getAllGroupsList = async () => {
    try{
        const data = await axios.get(import.meta.env.VITE_BACKEND_URL + `get_group_user_present/${username.id}/`);
        console.log(data);
        setGroups(data.data.data);

    }catch(e){
        console.log(e);
    }
  }
  useEffect(() => {
    allGroups();
    getAllGroupsList();
  }, []);

  const handleGroupClick = (groupid) => {
    // console.log(e.target.innerText);
    navigate("/insidegroup" , {state : groupid});
    
  };

  return (
    <div className="min-h-screen ">
   
    <Navbar userInfo={username} />
  
    
    <div className="py-6 px-4 sm:px-6 lg:px-8 ">
      <CreateGroup />
    </div>
  
   
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">Your Groups</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {grooups.map((group) => (
          <div
            key={group.id}
            className="p-4 bg-white border border-gray-200 shadow-sm rounded-lg hover:shadow-lg transition-shadow"
          >
            {console.log(group)}
            <button onClick={() => handleGroupClick(group.id)} className="text-lg font-bold text-gray-800 cursor-pointer">{group.name}</button>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  );
};

export default Dashboard;
