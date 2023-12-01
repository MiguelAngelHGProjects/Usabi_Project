import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu as AntdMenu, Button } from 'antd';
import dashboardService from '../../services/dashboard.service';

const Menu = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
      } catch (error) {
        console.error('Error fetching user details in Menu:', error);
      }
    };
  
    const token = localStorage.getItem('token');
    if (token) {
      fetchData();
    } else {
      console.error('No token found in Menu. Redirecting to login page.');
      navigate('/');
    }
  }, [navigate]); 

  const handleLogout = async () => {
    try {
      await dashboardService.logout();
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AntdMenu mode="horizontal">
      <AntdMenu.Item key="dashboard">
        <Link to="/dashboard">Dashboard</Link>
      </AntdMenu.Item>
      <AntdMenu.Item key="assing-projects">
        <Link to="/AssingProjects">Asignar Proyectos</Link>
      </AntdMenu.Item>
      <AntdMenu.Item key="logout">
        <Button type="link" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </AntdMenu.Item>
    </AntdMenu>
  );
};

export default Menu;
