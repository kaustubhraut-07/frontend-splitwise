import React, { useState } from "react";
import axios from "axios";

const Navbar = ({ userInfo }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [password, setPassword] = useState("");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsChangingPassword(false); 
  };

  const handleChangePasswordClick = () => {
    setIsChangingPassword(true); 
  };

  const handlePasswordSubmit = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}update_userinfo/${userInfo.id}/`,
        { password }
      );
      console.log(response.data, "Password updated successfully");
      alert("Password updated successfully!");
      setIsChangingPassword(false); 
      setPassword(""); 
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password. Please try again.");
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-semibold">Split Coast</span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center focus:outline-none"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://via.placeholder.com/50"
                  alt="Profile"
                />
                <span className="ml-2 text-gray-800">{userInfo.name}</span>
              </button>

              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  {isChangingPassword ? (
                    <div className="px-4 py-3">
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        onClick={handlePasswordSubmit}
                        className="mt-2 w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleChangePasswordClick}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Change Password
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
