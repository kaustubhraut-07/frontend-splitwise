import React from 'react';
import Login from './components/Login';
import Registeration from './components/Registeration';
import Dashboard from './components/Dashboard';
import { Routes, Route } from 'react-router-dom';
import InsideGroup from './components/InsideGroup';


const App = () => {
  // const 
  return (
    <div>
      <Routes>
        <Route index path="login" element={<Login />} />
        <Route path="register" element={<Registeration />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path="insidegroup" element={<InsideGroup />} />
      </Routes>
    </div>
  );
};

export default App;
