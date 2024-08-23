import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

interface UserDetails {
    name: string;
    surname: string;
    password: string;
}

export const useAuth = () => {
    const [signupError, setSignupError] = useState<string>('');
    const [loginError, setLoginError] = useState<string>('');
    const [userDetails, setUserDetails] = useState<UserDetails>({
        name: "",
        surname: "",
        password: ""
    });
    const navigate = useNavigate();

    const signup = async (username: string, email: string, password: string, firstname: string, lastname: string, gender: string) => {
        const params = {
            username,
            email,
            password,
            name: firstname,
            surname: lastname,
            gender,
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
        console.log({ BACKEND_URL });
        try {
            const response = await axios.post(`${BACKEND_URL}/auth/login`, {
                username,
                password
            });
            localStorage.setItem('token', response.data.token);
            console.log("Login successful:", response.data.token);
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
    };

    const clearLoginError = () => {
        setLoginError('');
    };

    const deleteUser = async (username: string | undefined) => {
        try {
            await axios.delete(`${BACKEND_URL}/user/${username}`);
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const modifyUser = async (username: string | undefined, updatedDetails: UserDetails) => {
        try {
            const response = await axios.put(`${BACKEND_URL}/user/${username}`, updatedDetails);
            console.log("User details updated:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error updating user details:", error);
            throw error;
        }
    };

    const fetchUserDetails = async (username: string | undefined) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/user/${username}`);
            const details: UserDetails = {
                name: response.data.name,
                surname: response.data.surname,
                password: ""
            };
            setUserDetails(details);
            return details;
        } catch (error) {
            console.error("Error fetching user details:", error);
            throw error;
        }
    };

    const updateUserDetails = (name: string, value: string) => {
        setUserDetails(prevDetails => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    return {
        signupError,
        signup,
        clearSignupError,
        loginError,
        login,
        clearLoginError,
        deleteUser,
        modifyUser,
        fetchUserDetails,
        userDetails,
        updateUserDetails
    };
};
