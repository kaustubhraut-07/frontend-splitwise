import React, { useEffect } from 'react'
import axios from 'axios';

const Dashboard = () => {

    const allGroups = async () => {
        const data = await axios.get(import.meta.env.VITE_BACKEND_URL + 'getall_groups/');
        console.log(data);
        return data;
    };
    useEffect(() => {
        allGroups();
    }, []);
  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard
