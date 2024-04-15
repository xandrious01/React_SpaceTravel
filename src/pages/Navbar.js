import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import '../styles/Navbar.css';



const Navbar = () => {

    return (
        <div>
            <nav className="info nav nav-pills flex-column flex-sm-row">
                <Link to='/' className="flex-sm-fill text-sm-center nav-link Navbar-tab" aria-current="page">Home</Link>

                <Link to='/spacecrafts' className="flex-sm-fill text-sm-center nav-link Navbar-tab">Spacecrafts</Link>

                <Link to='/planets' className="flex-sm-fill text-sm-center nav-link Navbar-tab">Planets</Link>
            </nav>

        </div>
    )


}


export default Navbar;