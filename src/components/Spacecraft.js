import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import SpaceTravelApi from "../services/SpaceTravelApi";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import LoadingGraphic from "./LoadingGraphic";
import rocketIcon from '../images/rocketIcon.png';
import '../styles/Spacecraft.css';
import ErrorMsg from "./ErrorMsg";


const Spacecraft = () => {
    const { id } = useParams();
    const { getSpacecraftById } = SpaceTravelApi;
    const [isLoading, setIsLoading] = useState(true);
    const [shipInfo, setShipInfo] = useState({});
    const [error, setError] = useState(false)
   

    useEffect(() => {
        try {
            getSpacecraftById({id}).then(response => setShipInfo(response.data));
        setIsLoading(false)
        } catch (err) {
            setError(true)
        }
        
    }, []);

    if (isLoading === true) {
        return (
            <LoadingGraphic />
        )
    } else if (isLoading === false) {
        const { name, capacity, description, pictureUrl, currentLocation } = shipInfo;
       

        return (
            <div className="Spacecraft-parent">
            <Container className='Spacecraft-div'>
                <Row>
                    {(pictureUrl) ? (<img className="Spacecraft-img"
                        src={pictureUrl}
                        alt="spacecraft" />) : (<img className="Spacecraft-img"
                        src={rocketIcon}
                        alt="spacecraft" />)}
                </Row>
                <Row>
                <h4 className="Spacecraft-name">{name}</h4>
                </Row>
                <p className="Spacecraft-info">Ship ID: {id}</p>
                <p className="Spacecraft-info">Capacity: {capacity}</p>
                <p className="Spacecraft-info">Ship Info: {description}</p>
                <p className="Spacecraft-info">Current Location: {currentLocation}</p>

                <Link to='/spacecrafts'>
                    <Button className='Spacecraft-back-btn'
                    variant="info">Go Back</Button>
                </Link>
            </Container>
            </div>
        )
    } else if (error) {
        return (
            <ErrorMsg />
        )
    }
};

export default Spacecraft;