import axios from 'axios';
import React, { useState } from 'react';

const CreateGroup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState('');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCreateGroup = async() => {
    if (groupName.trim() === '') {
      alert('Please enter a group name.');
      return;
    }

    console.log('Group Name:', groupName); 
    const data = await axios.post(import.meta.env.VITE_BACKEND_URL + 'create_group/', { groupName: groupName });
    console.log(data);
    if(data.status === 201) {
        alert('Group created successfully!'); 
    }
   
    toggleModal();
    setGroupName('');
  };

  return (
    <div className="p-4">
      {/* Button to open the modal */}
      <button
        onClick={toggleModal}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 "
      >
        Create Group
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Create a Group</h2>
            <label htmlFor="group-name" className="block mb-2">
              Group Name:
            </label>
            <input
              id="group-name"
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter group name"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={toggleModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGroup}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateGroup;
