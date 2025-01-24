import React, { useState } from 'react'
import './App.css'
import Card from './card'
import Navbar from "./components/navbar";
import Home from "./components/home";

function App() {
  return (
    <div>
      <Navbar />
      <Home/>
    </div>
  );
}

export default App;
