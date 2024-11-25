import React from 'react';
import Login from './components/Login';
import Registeration from './components/Registeration';
import Dashboard from './components/Dashboard';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Routes>
        <Route index path="login" element={<Login />} />
        <Route path="register" element={<Registeration />} />
        <Route path='dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
