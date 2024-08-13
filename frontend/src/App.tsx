import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/getstarted/Login';
import Home from './components/home/Home';
import Signup from './components/getstarted/Signup';
import RestrictedRoute from './components/hoc/RestrictedRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<RestrictedRoute><Login/></RestrictedRoute>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home/:username" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
