import React from 'react';
import { Dropdown, Button } from 'antd';
import iconMenu from '../icons/menu.svg';
import iconSearch from '../icons/search.svg';
import './style.css';
import Menu from '../Menu/menu';

const Header = ({ title }) => {
  return (
    <div className='header-container'>      
      <div className='icons-container'>
        <Dropdown overlay={<Menu /> } trigger={['click']} className="menu-overlay">
          <Button icon={<img src={iconMenu} alt="Menu Icon" />} className="menu-button">
          </Button>
        </Dropdown>
      </div>
      <h1>{title}</h1>
      <Button className='searchIcon' icon={<img src={iconSearch} alt="Search Icon" />} style={{ background: 'transparent', border: 'none' }} />
    </div>
  );
};

export default Header;