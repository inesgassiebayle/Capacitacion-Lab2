import React, { ComponentType, FC, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

const withAuth = (WrappedComponent: ComponentType) => {

    const AuthHOC: FC = (props) => {
        const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
        const { username } = useParams<{ username: string }>(); // Get username from URL

        useEffect(() => {
            const verifyToken = async () => {
                try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        setIsAuthenticated(false);
                        return;
                    }

                    const response = await axios.get(`http://localhost:3000/auth/verify`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    console.log('Token is valid:', response.data);

                    if (response.data.user.username !== username) {
                        setIsAuthenticated(false);
                        return;
                    }
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Error verifying token:', error);
                    setIsAuthenticated(false);
                }
            };

            verifyToken();
        }, [username]);


        if (isAuthenticated === null) {
            return <div>Loading...</div>;
        }

        if (!isAuthenticated) {
            return <Navigate to="/login" />;
        }

        return <WrappedComponent {...props} />;
    };

    return AuthHOC;

};

export default withAuth;
