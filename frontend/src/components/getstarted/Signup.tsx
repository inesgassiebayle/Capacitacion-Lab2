import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GetStarted.css';
import { useAuth } from "../../hooks/useAuth";

const Signup: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [gender, setGender] = useState("");

    const { signupError, signup, clearSignupError } = useAuth();
    const navigate = useNavigate();

    const handleSignup = () => {
        signup(username, email, password, firstname, lastname, gender);
    };

    return (
        <div className="getstarted-wrapper">
            <div className="getstarted-container">
                <div className='getstarted-header'>
                    <div className='getstarted-title'>
                        <div className='text'>Sign Up</div>
                    </div>
                </div>
                <div className='getstarted-inputs'>
                    <div className='getstarted-input'>
                        <input
                            type='text'
                            placeholder='Username'
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                clearSignupError();
                            }}
                        />
                    </div>
                    <div className='getstarted-input'>
                        <input
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                clearSignupError();
                            }}
                        />
                    </div>
                    <div className='getstarted-input'>
                        <input
                            type='text'
                            placeholder='First Name'
                            value={firstname}
                            onChange={(e) => {
                                setFirstname(e.target.value);
                                clearSignupError();
                            }}
                        />
                    </div>
                    <div className='getstarted-input'>
                        <input
                            type='text'
                            placeholder='Last Name'
                            value={lastname}
                            onChange={(e) => {
                                setLastname(e.target.value);
                                clearSignupError();
                            }}
                        />
                    </div>
                    <div className='getstarted-input'>
                        <select
                            value={gender}
                            onChange={(e) => {
                                setGender(e.target.value);
                                clearSignupError(); // Clear error on change
                            }}
                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                        </select>
                    </div>
                    <div className='getstarted-input'>
                        <input
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                clearSignupError();
                            }}
                        />
                    </div>
                    {signupError && (
                        <div className="error-message" style={{color: 'red', textAlign: 'center'}}>{signupError}</div>
                    )}
                </div>
                <div className='forgot-password'>Forgot your password? <button>Click Here!</button></div>
                <div className='forgot-password'>Already have an account? <button onClick={() => navigate('/login')}>Login</button></div>
                <button className='getstarted-button' onClick={handleSignup}>Sign Up</button>
            </div>
        </div>
    );
};

export default Signup;
