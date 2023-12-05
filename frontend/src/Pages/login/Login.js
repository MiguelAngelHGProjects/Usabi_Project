import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import loginService from '../../services/login.service';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import Dashboard from '../dashboard/Dashboard';
import './style.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const axiosInterceptorRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const setupAxiosInterceptor = () => {
      if (!axiosInterceptorRef.current && token) {
        axiosInterceptorRef.current = axios.interceptors.request.use((config) => {
          if (isLoggedIn) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        });
      }
    };

    const cleanupAxiosInterceptor = () => {
      if (axiosInterceptorRef.current) {
        axios.interceptors.request.eject(axiosInterceptorRef.current);
        axiosInterceptorRef.current = null;
      }
    };

    setupAxiosInterceptor();

    return cleanupAxiosInterceptor;
  }, [isLoggedIn, user]);

  const checkTokenOnLoad = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
        // console.log('User is logged in.');
      }
    } catch (error) {
      console.error('Error checking token on page load:', error);
    }
  };

  useEffect(() => {
    checkTokenOnLoad();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await loginService.login({ email, password });

      if (response && response.data) {
        setUser(response.data);
        setIsLoggedIn(true);
        // console.log('User logged in:', response.data);
      } else {
        console.error('Error during login: Unexpected response format.');
        console.error('Full response:', response);
      }
    } catch (error) {
      console.error('Error during login:', error.message);

      if (error.message === 'Invalid credentials') {
      } else {
      }
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (isLoggedIn) {
    return <Dashboard user={user} handleLogout={handleLogout} />;
  }

  return (
    <div className="login-container">
      <div className="log-header">
        <Header title="Iniciar sesión" />
      </div>
      <div className="login-form">
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button onClick={handleLogin} className="login-btn">
          Login
        </button>
        <Link to="/register" className="register-link">
          Registrarse
        </Link>
      </div>
    </div>
  );
}

export default Login;
