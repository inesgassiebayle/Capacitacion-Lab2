import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const RestrictedRoute: FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [username, setUsername] = useState<string | null>(null);

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
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUsername(response.data.user.username);
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        verifyToken();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        return <Navigate to={`/home/${username}`} />;
    }

    return <>{children}</>;
};

export default RestrictedRoute;
