import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import Register from "./register/Register";
import AssingProjects from "./userProjects/userProjects";
import reportWebVitals from './reportWebVitals';

const RootComponent = () => (
  <React.StrictMode>
    <Routes>
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/AssingProjects" element={<AssingProjects />} />
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
