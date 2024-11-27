import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AddExpense from './AddExpense';

const InsideGroup = () => {
  const location = useLocation();
  const groupId = location.state; 
  const [groupInfo, setGroupInfo] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [usersList, setUsersList] = useState([]);

  // Fetch group info
  const getGroupInfo = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}getGroupinfo/${groupId}/`);
      setGroupInfo(data.data);
    } catch (error) {
      console.error('Error fetching group info:', error);
    }
  };

 
  const getAllUserList = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}getAllUsers/`);
      setUsersList(data.data);
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  };

 
  const handleAddUser = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    if (!selectedUserId) {
      setErrorMessage('Please select a user.');
      return;
    }
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}add_user_to_group/${groupId}/`, {
        user_info: selectedUserId,
      });
      setSuccessMessage(response.data.message || 'User added successfully!');
      setSelectedUserId('');
      getGroupInfo(); 
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Failed to add user. Please try again.');
    }
  };

  const getUserInfo = (userId) => {

    try {
      const user = usersList.find((user) => user.id === userId);
      return user ? `${user.name} (${user.email})` : 'User not found';
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
   
  };

  useEffect(() => {
    getGroupInfo();
    getAllUserList();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Group: {groupInfo?.name || 'Loading...'}
        </h1>

    
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Group Members : {groupInfo?.users?.length}</h2>
        <ul className="space-y-3">
          {groupInfo?.users?.length && groupInfo?.users?.map((user, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-md"
            >
              <span className="text-gray-800">{getUserInfo(user)}</span>
            </li>
          ))}
        </ul>

       
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Add a User</h2>
          <form onSubmit={handleAddUser} className="space-y-4">
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" disabled>
                Select a user
              </option>
              {usersList.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
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

      <AddExpense groupId={groupId}/>
    </div>
  );
};

export default InsideGroup;
