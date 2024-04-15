import React from "react";
import '../styles/ShipButton.css'
import rocketIcon from '../images/rocketIcon.png';

const ShipButton = ({ id, name, pictureUrl, selectShip }) => {
    let shipImg;
    pictureUrl !== null ? shipImg = pictureUrl : shipImg = rocketIcon;
    return (
            <button className='Ship-btn'
            onClick={()=>selectShip(id)}>
                <img 
                className="Ship-icon"
                src={rocketIcon} alt='spaceship' />
                <p className="Shipbtn-name">{name}</p>
            </button>
    )
};

export default ShipButton;