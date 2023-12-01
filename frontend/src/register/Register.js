import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import registerService from '../services/register.service';
import "./style.css";
import Header from '../components/header/header';

function Register() {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [icon, setIcon] = useState(null);

  const navigate = useNavigate();

  const formData = new FormData();
  formData.append('user[name]', name);
  formData.append('user[lastname]', lastname);
  formData.append('user[email]', email);
  formData.append('user[password]', password);
  formData.append('user[icon]', icon);
  formData.append('user[user_type]', 'user');
  
  const handleRegistration = async () => {
    try {
      const result = await registerService.register(formData);
      handleRegistrationSuccess(result);
    } catch (error) {
      handleRegistrationError(error);
    }
  };

  const handleRegistrationSuccess = (result) => {
    // console.log(result);
    redirectToLogin();
  };

  const handleRegistrationError = (error) => {
    console.error('Error during registration:', error);
  };

  const redirectToLogin = () => {
    navigate("/");
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    setIcon(file);
  };

  return (
    <div className="registration-container">
      <header className="registration-header">
        <div className='log-header'>
          <Header title="Registro" />
        </div>
      </header>
      <form encType="multipart/form-data" className="registration-form">
        {renderInput("Name", name, (e) => setName(e.target.value))}
        {renderInput("Lastname", lastname, (e) => setLastname(e.target.value))}
        {renderInput("Email", email, (e) => setEmail(e.target.value))}
        {renderInput("Password", password, (e) => setPassword(e.target.value), "password")}
        {renderFileInput("Icon", handleIconChange)}
        <button type="button" onClick={handleRegistration} className="registration-btn">
          Register
        </button>
        <Link to="/">Back to Login</Link>
      </form>
    </div>
  );
}

const renderInput = (label, value, onChange, type = "text") => (
  <>
    <label>
      {label}:
      <input type={type} value={value} onChange={onChange} className="input-field" />
    </label>
    <br />
  </>
);

const renderFileInput = (label, onChange) => (
  <>
    <label>
      {label}:
      <input type="file" accept="image/*" onChange={onChange} />
    </label>
    <br />
  </>
);

export default Register;
