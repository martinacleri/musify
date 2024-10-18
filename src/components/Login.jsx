import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../stylesheets/Login.css'

const Login = ({ onCredentialsUpdate }) => {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (clientId && clientSecret) {
      onCredentialsUpdate(clientId, clientSecret);
      navigate('/search');
    } else {
      alert('Por favor, ingresa el Client ID y el Client Secret.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">BIENVENIDO A MUSIFY</h1>
      <h2 className="login-subtitle">Ingrese sus credenciales para empezar</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-field">
          <label className="login-label">CLIENT ID: </label>
          <input
            className="login-input"
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required/>
        </div>
        <div className="login-field">
          <label className="login-label">CLIENT SECRET: </label>
          <input
            className="login-input"
            type="text"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
            required/>
        </div>
        <button className="login-button" type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;