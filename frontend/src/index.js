import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Login from "./Pages/login/Login";
import Dashboard from "./Pages/dashboard/Dashboard";
import Register from "./Pages/register/Register";
import AssingProjects from "./Pages/userProjects/userProjects";
import Userconf from "./Pages/userConf/userConf";
import reportWebVitals from './reportWebVitals';

const RootComponent = () => (
  <React.StrictMode>
    <Routes>
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/AssingProjects" element={<AssingProjects />} />
      <Route path="/Settings" element={<Userconf />} />
    </Routes>
  </React.StrictMode>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <RootComponent />
  </BrowserRouter>
);

reportWebVitals();
