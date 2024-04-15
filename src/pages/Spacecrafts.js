import React, { useState, useEffect } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";
import NewShipBtn from "../components/NewShipBtn";
import LoadingGraphic from "../components/LoadingGraphic";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import ErrorMsg from "../components/ErrorMsg";
import rocketIcon from '../images/rocketIcon.png';
import '../styles/Spacecrafts.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Spacecrafts = () => {
    const { getSpacecrafts,
        destroySpacecraftById } = SpaceTravelApi;
    const [isLoading, setIsLoading] = useState(true);
    const [spacecrafts, setSpacecrafts] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        try {
        getSpacecrafts().then(response => setSpacecrafts(response.data))
        setIsLoading(false)
        } catch (err) {
            setError(true);
        }
    }, [])

    if (isLoading === true) {
        return (
            <LoadingGraphic />
        )
    } else if (isLoading === false && spacecrafts.length > 0) {
        return (
            <div>
                <NewShipBtn />
                <Container className='Spacecrafts-div'>

                    <ul>

                        {spacecrafts.map(i => {
                            let shipImg;
                            const { id, pictureUrl } = i;
                            return (
                                <li key={id}>
                                    <Row className='Spacecrafts-ship-div'>
                                        <Col>
                                            {(pictureUrl) ? (<img className="Spacecraft-img"
                                                src={pictureUrl}
                                                alt="spacecraft" />) : (<img className="Spacecraft-img"
                                                    src={rocketIcon}
                                                    alt="spacecraft" />)}
                                        </Col>
                                        <Col className='Spacecrafts-info'>
                                            <Link to={`/spacecraft/${id}`}
                                                className="Spacecraft-link">
                                                <h6 className="Spacecraft-name">{i.name}</h6>
                                                <p className="Spacecraft-info">Current Location: {i.currentLocation}</p>
                                                <p className="Spacecraft-info">Capacity: {i.capacity}</p>
                                                </Link>
                                                <Button
                                                    className="btn destroy-btn"
                                                    variant="info" onClick={() =>{
                                                        destroySpacecraftById({id})
                                                        setSpacecrafts(spacecrafts.filter(i => i.id !== id))
                                                        }}>Destroy Ship</Button>
                                            
                                        </Col>
                                    </Row>
                                </li>)
                        })}

                    </ul>

                </Container>
            </div>
        )
    } else if ((!isLoading) && spacecrafts) {
        return (
            <div>
                <NewShipBtn />
                <Container className='Spacecrafts-div'>
                    <div><h3 className="Spacecrafts-no-ships-msg">No ships currently found. Please build a new ship.</h3></div>
                </Container>
            </div>
        )
    } else if (error) {
        return (
            <ErrorMsg />
        )
    }



};

export default Spacecrafts;