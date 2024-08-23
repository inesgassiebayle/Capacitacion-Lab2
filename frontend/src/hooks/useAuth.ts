import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const useAuth = () => {
    const [signupError, setSignupError] = useState<string>('');
    const [loginError, setLoginError] = useState<string>('');
    const navigate = useNavigate();

    const signup = async (username: string, email: string, password: string, firstname: string, lastname: string, gender: string) => {
        const params = {
            username: username,
            email: email,
            password: password,
            name: firstname,
            surname: lastname,
            gender: gender,
        };

        try {
            const response = await axios.post(`${BACKEND_URL}/auth/signup`, params);
            navigate(`/login`);
            setSignupError('');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMsg = error.response?.data?.message || 'An unexpected error occurred.';
                console.error('Signup error:', errorMsg);
                setSignupError(Array.isArray(errorMsg) ? errorMsg.join(', ') : errorMsg);
            } else {
                console.error('An unexpected error occurred:', error);
                setSignupError('An unexpected error occurred.');
            }
        }
    };

    const clearSignupError = () => {
        setSignupError('');
    };

    const login = async (username: string, password: string) => {
        console.log({BACKEND_URL});
        try {
            const response = await axios.post(`${BACKEND_URL}/auth/login`, {
                username: username,
                password: password
            });
            localStorage.setItem('token', response.data.token);
            console.log("Inicio de sesión exitoso :", response.data.token);
            const userData = response.data.user;
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
    }

    const clearLoginError = () => {
        setLoginError('');
    };

    return {
        signupError,
        signup,
        clearSignupError,
        loginError,
        login,
        clearLoginError
    };
};
