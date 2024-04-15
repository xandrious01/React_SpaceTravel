import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import '../styles/SendShip.css'


const SendShip = ({ planets, ships, selectedElements, launchShip, flightSuccessful }) => {
    const { spacecraftId, targetPlanetId } = selectedElements;
    const [hasError, setHasError] = useState(null);

    let planetName;
    let shipName;
    let shipLocation;

    function getPlanetName() {
        if (targetPlanetId !== '') {
            const planetInfo = planets.filter(i => i.id === targetPlanetId);
            return planetName = planetInfo[0].name
        }
        return planetName;
    }
    getPlanetName();

    function getShipName() {
        if (spacecraftId !== '') {
            const shipInfo = ships.filter(i => i.id === spacecraftId);
            shipName = shipInfo[0].name;
            shipLocation = shipInfo[0].currentLocation;
        }
        return;
    }
    getPlanetName();
    getShipName();

    useEffect(() => {
        targetPlanetId !== shipLocation ? setHasError(false) : setHasError(true);
    }, [selectedElements])

    return (!flightSuccessful) ? (
        <div className='SendShip-div'>
            <Row>
                <p>Destination: {(planetName) ? planetName : 'Please select a destination'}</p>
            </Row>
            <Row>
                <p>Ship: {(shipName) ? shipName : 'Please select a ship'}</p>
            </Row>
            <Row>
                {shipName && planetName ? (<Button variant='info' className="launch-btn"
                    id="launch-btn"
                    onClick={() => {
                        if (hasError === false) {
                            return launchShip();
                        }
                    }}
                >
                    Launch Flight
                </Button>) : ''}
            </Row>
            {hasError === true ? (<Row>
                <p className="SendShip-error">Please select a valid destination.</p>
            </Row>) : ''}
        </div>
    ) : (
        <div className='SendShip-div'>
            <p className="SendShip-success">
                Flight Successful!
            </p>
        </div>)

}

export default SendShip;