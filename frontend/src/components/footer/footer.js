import React from 'react';
import { Button } from 'antd';
import calIcon from '../icons/calendar.svg';
import configIcon from '../icons/config.svg';
import './style.css';

const Footer = ({ image }) => {
  return (
    <div className='footer-container'>            
      <div className='icons-container'>
      </div>
      <Button className='configIcon' href='/AssingProjects' icon={<img src={calIcon} alt="Calendar Icon" />} style={{ background: 'transparent', border: 'none' }} />
      {image ? (
        <a href='/Settings'>
        <img src={image} alt="User Icon" className="user-icon" />
        </a>
      ) : (
        <span>Imagen no disponible</span>
      )}
      <Button className='configIcon' href='../../../UserHelper/Documento de ayuda.html' icon={<img src={configIcon} alt="Config Icon" />} style={{ background: 'transparent', border: 'none' }} />
    </div>
  );
};

export default Footer;
