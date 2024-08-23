import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import axios, { AxiosError } from "axios";
import './GetStarted.css'
import withAuth from "../hoc/Authentication";
import {useAuth} from "../../hooks/useAuth";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { login, loginError, clearLoginError } = useAuth();


    const handleLogin = async () => {
       login(username, password);
    };

    return (
        <div className="getstarted-wrapper">
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
                            clearLoginError();
                        }}/>
                    </div>
                    <div className='getstarted-input'>
                        <input type='password' placeholder='Password' value={password} onChange={(e) => {
                            setPassword(e.target.value);
                            clearLoginError();
                        }} />
                    </div>
                    {loginError && (
                        <div className="error-message" style={{color: 'red', textAlign: 'center'}}>{loginError}</div>
                    )}
                </div>
                <div className='forgot-password'>Forgot your password? <button>Click Here!</button></div>
                <div className='forgot-password'>Are you new here? <button onClick={() => navigate('/signup')}>Sign up</button></div>
                <button className='getstarted-button' onClick={handleLogin}>Login</button>
            </div>
        </div>
    );

};

export default Login;
