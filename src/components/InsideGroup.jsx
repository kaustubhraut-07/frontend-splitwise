import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const InsideGroup = () => {
  const location = useLocation();
  const groupId = location.state; 
  const [groupInfo, setGroupInfo] = useState(null);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch group info
  const getGroupInfo = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}getGroupinfo/${groupId}/`);
      setGroupInfo(data.data);
    } catch (error) {
      console.error('Error fetching group info:', error);
    }
  };

  // Add user to group
  const handleAddUser = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}addUserToGroup/`, {
        groupId,
        email: newUserEmail,
      });
      setSuccessMessage(response.data.message || 'User added successfully!');
      setNewUserEmail('');
      getGroupInfo(); 
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Failed to add user. Please try again.');
    }
  };

  useEffect(() => {
    getGroupInfo();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Group: {groupInfo?.name || 'Loading...'}
        </h1>

        
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Group Members</h2>
        <ul className="space-y-3">
          {groupInfo?.users?.map((user, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-md"
            >
              <span className="text-gray-800">{user.name} ({user.email})</span>
            </li>
          ))}
        </ul>

        
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Add a User</h2>
          <form onSubmit={handleAddUser} className="space-y-4">
            <input
              type="email"
              placeholder="Enter user email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add User
            </button>
          </form>

          
          {successMessage && <p className="text-green-600 mt-3">{successMessage}</p>}
          {errorMessage && <p className="text-red-600 mt-3">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default InsideGroup;
