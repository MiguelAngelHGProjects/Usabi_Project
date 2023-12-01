import { Button } from 'antd';
import React from 'react';
import iconMenu from '../icons/menu.svg';
import iconSearch from '../icons/search.svg';
import "./style.css";

const Header = ({ title }) => {
    return (
        <div className='header-container'>            
            <div className='icons-container'>
                <Button icon={<img src={iconMenu} alt="Menu Icon" />} style={{ background: 'transparent', border: 'none' }} />
            </div>
            <h1>{title}</h1>
            <Button className='searchIcon' icon={<img src={iconSearch} alt="Search Icon" />} style={{ background: 'transparent', border: 'none' }} />
        </div>
    );
};

export default Header;
