import React, { useState } from 'react'
import './App.css'
import Navbar from "./components/navbar";
import Home from "./components/home";
import { Route, Routes } from 'react-router-dom';
import LeaderBoard from './components/leaderBoard';
import ImpactDashboard from './components/impactDashboard';
import Profile from './components/profile';
import Store from './components/store';
import Footer from './components/footer';
import Login from './components/Login';
import MainPage from './components/Mainpage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/impactdashboard" element={<ImpactDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/store" element={<Store />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
