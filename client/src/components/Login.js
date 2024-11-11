import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Login.css';

function Login() {
  const [user, setUser] = useState({ login: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth(); // Import the login function

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!user.login) newErrors.login = 'User Name is mandatory';
    if (!user.password) newErrors.password = 'Password is mandatory';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, user);
      if (res.data.token) {
        login(user.login); // Pass username to login function
        navigate('/main'); // Redirect to the main page
      } else {
        setErrors({ form: 'Login failed: No token received' });
      }
    } catch (error) {
      let errorMessage = 'Unexpected error occurred. Please try again.';
      if (error.response) {
        errorMessage = error.response.data?.error || error.response.data?.message || errorMessage;
      }
      setErrors({ form: errorMessage });
    }
  };

  return (
    <div className="login-page">
      <div className="login-logo-container">
        <img src="/logo.png" alt="RSquareAI Logo" style={{ width: '200px' }} />
      </div>

      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="login"
              placeholder={errors.login || "User Name"}
              value={user.login}
              onChange={handleChange}
              className={errors.login ? 'error-placeholder' : ''}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder={errors.password || "Password"}
              value={user.password}
              onChange={handleChange}
              className={errors.password ? 'error-placeholder' : ''}
            />
          </div>
          <button type="submit">Login</button>
          {errors.form && <p className="error-message form-error">{errors.form}</p>}
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
