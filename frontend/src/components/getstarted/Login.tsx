import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import axios, { AxiosError } from "axios";
import './GetStarted.css'

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [loginError, setLoginError] = useState('');

    const login = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/auth/login`, {
                username: username,
                password: password
            });

            localStorage.setItem('token', response.data.token);
            console.log("Inicio de sesión exitoso:", response.data.token);


            const userData = response.data.user;  // Accede al objeto 'user'

            navigate(`/home/${userData.username}`);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMsg = error.response?.data || 'An unexpected error occurred.';
                console.error('Error while sending request:', errorMsg);
                setLoginError('');
                if (typeof errorMsg === 'string' && (errorMsg.includes("User does not exist") || errorMsg.includes("User not found"))) {
                    setLoginError("User or password incorrect");
                }
            } else {
                console.error('An unexpected error occurred:', error);
                setLoginError('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="getstarted-container">
            <div className='getstarted-header'>
                <div className='getstarted-title'>
                    <div className='text'>Login</div>
                </div>
            </div>
            <div className='getstarted-inputs'>
                <div className='getstarted-input'>
                    <input type='text' placeholder='Username' value={username} onChange={(e) => {
                        setUsername(e.target.value);
                        setLoginError('');
                    }}/>
                </div>
                <div className='getstarted-input'>
                    <input type='password' placeholder='Password' value={password} onChange={(e) => {
                        setPassword(e.target.value);
                        setLoginError('');
                    }} />
                </div>
                {loginError && (
                    <div className="error-message" style={{color: 'red', textAlign: 'center'}}>{loginError}</div>
                )}
            </div>
            <div className='forgot-password'>Forgot your password?<button>Click Here!</button></div>
            <div className='forgot-password'>Are you new here? <button onClick={() => navigate('/signup')}>Sign up</button></div>
            <button className='getstarted-button' onClick={login}>Login</button>
        </div>
    );
};

export default Login;
