import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/getstarted/Login";
import Home from "./components/home/Home";
import Signup from "./components/getstarted/Signup";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/home/:username" element={<Home/>} />
    </Routes>
  );
}

export default App;
