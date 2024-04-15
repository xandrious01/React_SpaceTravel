import React, { useState, useEffect, useContext } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";
import PlanetsContext from "../context/PlanetsContext";
import Planet from "../components/Planet";
import LoadingGraphic from "../components/LoadingGraphic";
import ShipButton from "../components/ShipButton";
import Container from 'react-bootstrap/Container';
import SendShip from "../components/SendShip";
import ErrorMsg from "../components/ErrorMsg";
import "bootstrap/dist/css/bootstrap.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/Planets.css'


const Planets = () => {
    const selectedElements_intialState = { spacecraftId: '', targetPlanetId: '' };
    const [planets, setPlanets] = useState([]);
    const [ships, setShips] = useState([]);
    const [selectedElements, setSelectedElements] = useState(selectedElements_intialState);
    const [flightSuccessful, setFlightSuccessful] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const { getPlanets,
        getSpacecrafts,
        sendSpacecraftToPlanet } = SpaceTravelApi;

    useEffect(() => {
        async function requestPlanetData() {
            const response = await getPlanets();
            setPlanets(response.data);
        }
        async function requestShipsData() {
            const response = await getSpacecrafts();
            setShips(response.data);
        }
        try {
            requestPlanetData();
            requestShipsData();
            setIsLoading(false)
        } catch (err) {
            setError(true)
        }
        
    }, [flightSuccessful])

    const selectPlanet = (id) => {
        setSelectedElements(selectedElements => {
            selectedElements['targetPlanetId'] = id;
            return { ...selectedElements };
        });
    }

    const selectShip = (id) => {
        setSelectedElements(selectedElements => {
            selectedElements['spacecraftId'] = id;
            return { ...selectedElements };
        })
    }

    async function launchShip(selectedELements) {
        const response = await sendSpacecraftToPlanet({ ...selectedElements });
        return (response.isError) === false ? setFlightSuccessful(true) : setFlightSuccessful(false);
    }

    useEffect(() => {
        if (flightSuccessful === true) {
            const timeoutId = setTimeout(() => {
                setFlightSuccessful(null);
                setSelectedElements(selectedElements_intialState);
            }, 2500);
            return () => (timeoutId)
        }
    }, [flightSuccessful])

    if (isLoading === true) {
        return (
            <div>
                <LoadingGraphic />
            </div>
        )
    } else if (isLoading === false) {
        return (
            <PlanetsContext.Provider value={planets}>
            <div>
                <SendShip
                    ships={ships}
                    selectedElements={selectedElements}
                    launchShip={launchShip}
                    flightSuccessful={flightSuccessful}
                />
                <Container className='Planets-container'>
                    <ul>
                        {planets.map(i => {
                            let presentShips = ships.filter(j => j.currentLocation === i.id);
                            return (
                                <li key={i.id}>
                                    <Row className="Planet-row">
                                        <Planet
                                            key={i.id}
                                            id={i.id}
                                            currentPopulation={i.currentPopulation}
                                            name={i.name}
                                            pictureUrl={i.pictureUrl}
                                            selectPlanet={selectPlanet}
                                        />
                                        <Col>
                                            {presentShips.map(j => {
                                                return (
                                                    <ShipButton
                                                        key={j.id}
                                                        id={j.id}
                                                        name={j.name}
                                                        pictureUrl={j.pictureUrl}
                                                        selectShip={selectShip}
                                                    />
                                                )
                                            })}
                                        </Col>
                                    </Row>

                                </li>
                            )
                        })}
                    </ul>
                </Container>
            </div>
            </PlanetsContext.Provider>

        )
    } else if (error) {
        return (
            <ErrorMsg />
        )
    }
};

export default Planets;

