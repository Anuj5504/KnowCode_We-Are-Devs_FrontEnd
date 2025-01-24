import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './card'
import Navbar from "./components/navbar";

function App() {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        <h1 className="text-3xl font-bold">Welcome to My Website</h1>
        <p className="mt-4">This is a sample page with a responsive and animated navbar.</p>
      </main>
    </div>
  );
}

export default App;
