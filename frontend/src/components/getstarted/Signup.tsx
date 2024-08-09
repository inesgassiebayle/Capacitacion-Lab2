import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import axios, { AxiosError } from "axios";
import './GetStarted.css'

const Signup: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [gender, setGender] = useState("");
    const navigate = useNavigate();

    const [signupError, setSignupError] = useState<string>('');

    const signup = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/auth/signup`, {
                username: username,
                email: email,
                password: password,
                name: firstname,
                surname: lastname,
                gender: gender
            });

            // Navigate to login page after successful signup
            navigate(`/login`);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMsg = error.response?.data?.message || 'An unexpected error occurred.';
                console.error('Error while sending request:', errorMsg);
                setSignupError(Array.isArray(errorMsg) ? errorMsg.join(', ') : errorMsg);
            } else {
                console.error('An unexpected error occurred:', error);
                setSignupError('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="getstarted-container">
            <div className='getstarted-header'>
                <div className='getstarted-title'>
                    <div className='text'>Sign Up</div>
                </div>
            </div>
            <div className='getstarted-inputs'>
                <div className='getstarted-input'>
                    <input type='text' placeholder='Username' value={username} onChange={(e) => {
                        setUsername(e.target.value);
                        setSignupError('');
                    }} />
                </div>
                <div className='getstarted-input'>
                    <input type='email' placeholder='Email' value={email} onChange={(e) => {
                        setEmail(e.target.value);
                        setSignupError('');
                    }} />
                </div>
                <div className='getstarted-input'>
                    <input type='text' placeholder='First Name' value={firstname} onChange={(e) => {
                        setFirstname(e.target.value);
                        setSignupError('');
                    }} />
                </div>
                <div className='getstarted-input'>
                    <input type='text' placeholder='Last Name' value={lastname} onChange={(e) => {
                        setLastname(e.target.value);
                        setSignupError('');
                    }} />
                </div>
                <div className='getstarted-input'>
                    <select value={gender} onChange={(e) => {
                        setGender(e.target.value);
                        setSignupError('');
                    }}>
                        <option value="" disabled>Select Gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>
                </div>
                <div className='getstarted-input'>
                    <input type='password' placeholder='Password' value={password} onChange={(e) => {
                        setPassword(e.target.value);
                        setSignupError('');
                    }} />
                </div>
                {signupError && (
                    <div className="error-message" style={{color: 'red', textAlign: 'center'}}>{signupError}</div>
                )}
            </div>
            <div className='forgot-password'>Forgot your password?<button>Click Here!</button></div>
            <div className='forgot-password'>Already have an account? <button onClick={() => navigate('/login')}>Login</button></div>
            <button className='getstarted-button' onClick={signup}>Sign Up</button>
        </div>
    );
};

export default Signup;
