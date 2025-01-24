import React, { useState } from 'react'
import './App.css'
import Navbar from "./components/navbar";
import Home from "./components/home";
import { Route, Routes } from 'react-router-dom';
import LeaderBoard from './components/leaderBoard';
import ImpactDashboard from './components/impactDashboard';
import Profile from './components/profile';
import Store from './components/store';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<LeaderBoard/>} />
        <Route path="/impact-dashboard" element={<ImpactDashboard/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/store" element={<Store/>} />
      </Routes>
    </div>
  );
}

export default App;
