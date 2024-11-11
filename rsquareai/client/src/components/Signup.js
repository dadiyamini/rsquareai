import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import Modal from './successSignUp';

function Signup() {
    const [user, setUser] = useState({ login: '', password: '', confirmPassword: '', fname: '', lname: '', email: '', mobile: '' });
    const [errors, setErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false); 
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!user.login) newErrors.login = 'User Name is mandatory';
        if (!user.password) newErrors.password = 'Password is mandatory';
        if (!user.email) newErrors.email = 'Email is mandatory';
        else if (!/^\S+@\S+\.\S+$/.test(user.email)) newErrors.emailFormat = 'Please enter a valid email address';
        if (!user.fname) newErrors.fname = 'First Name is mandatory';
        if (!user.mobile) newErrors.mobile = 'Mobile number is mandatory';
        else if (!/^\d{10}$/.test(user.mobile)) newErrors.mobileFormat = 'Please enter a valid 10-digit mobile number';

        if (user.password !== user.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);

            Object.keys(newErrors).forEach((field) => {
                const input = document.querySelector(`input[name=${field}]`);
                if (input) {
                    input.classList.remove('error-placeholder');
                    void input.offsetWidth;
                    input.classList.add('error-placeholder');
                }
            });

            return;
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, user);
            setErrors({});
            setShowModal(true);
        } catch (error) {
            let errorMessage = 'Signup failed. Please try again.';
            if (error.response && error.response.data && error.response.data.error) {
                errorMessage = error.response.data.error;
            }
            setErrors({ form: errorMessage });
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const redirectToLogin = () => {
        navigate('/');
        closeModal();
    };

    return (
        <div className="signup-page">
            <div className="signup-logo-container">
                <img src="/logo.png" alt="RSquareAI Logo" style={{ width: '200px' }} />
            </div>

            <div className="signup-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit} noValidate>
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
                    <div className="input-group password-group">
                        <input
                            type={passwordVisible ? "text" : "password"} 
                            name="password"
                            placeholder={errors.password || "Password"}
                            value={user.password}
                            onChange={handleChange}
                            className={errors.password ? 'error-placeholder' : ''} 
                        />
                        <span
                            className="eye-icon"
                            onClick={() => setPasswordVisible(!passwordVisible)} 
                        >
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />} 
                        </span>
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="confirmPassword"
                            placeholder={errors.confirmPassword || "Confirm Password"}
                            value={user.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? 'error-placeholder' : ''} 
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="fname"
                            placeholder={errors.fname || "First Name"}
                            value={user.fname}
                            onChange={handleChange}
                            className={errors.fname ? 'error-placeholder' : ''} 
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="lname"
                            placeholder="Last Name"
                            value={user.lname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="email"
                            placeholder={errors.email || "Email"}
                            value={user.email}
                            onChange={handleChange}
                            className={errors.email ? 'error-placeholder' : ''} 
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="mobile"
                            placeholder={errors.mobile || "Mobile Number"}
                            value={user.mobile}
                            onChange={handleChange}
                            className={errors.mobile ? 'error-placeholder' : ''} 
                        />
                    </div>
                    <button type="submit">Sign Up</button>

                    {errors.form && <p className="error-message form-error">{errors.form}</p>}
                    {errors.mobileFormat && !errors.form && <p className="error-message form-error">{errors.mobileFormat}</p>}
                    {errors.emailFormat && !errors.form && <p className="error-message form-error">{errors.emailFormat}</p>}
                    {errors.confirmPassword && !errors.form && <p className="error-message form-error">{errors.confirmPassword}</p>}
                </form>
                <p>
                    Already have an account? <Link to="/">Login here</Link>
                </p>

                {showModal && (
                    <Modal 
                        message="Signup Successful!" 
                        userName={user.login}
                        onRedirect={redirectToLogin} 
                    />
                )}
            </div>
        </div>
    );
}

export default Signup;