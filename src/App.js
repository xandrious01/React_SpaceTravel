import React, { useState } from "react";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import { Routes, Route } from "react-router-dom"; import Planets from "./pages/Planets";
import background from './images/background.png'
import Spacecrafts from "./pages/Spacecrafts";
import BuildShip from "./pages/BuildShip";
import Spacecraft from "./components/Spacecraft";
import Footer from "./components/Footer";

function App() {
    const styling = {
        backgroundImage: `url(${background})`,
        fontSize: "50px",
        backgroundSize: 'cover',
        backgroundRepeat: 'repeat',
        height: '100vh',
        width: '100vw',
        overflowX: 'hidden'
    };

    return (
        <div style={styling}>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/*' element={<Home />} />
                <Route path='/Spacecrafts' element={<Spacecrafts />} />
                <Route path='/spacecraft/build' element={<BuildShip />} />
                <Route path='/spacecraft/:id' element={<Spacecraft />} />
                <Route path='/planets' element={<Planets />} />
            </Routes>
            <Footer />
        </div>

    )
};


export default App;
