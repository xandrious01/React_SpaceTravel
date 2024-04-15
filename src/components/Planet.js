import React from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import '../styles/Planet.css'

const Planet = ({ id, name, currentPopulation, pictureUrl, selectPlanet }) => {

    return (
        <>
            <Col>
                <img src={pictureUrl} alt={name} className='Planet-img' />
            </Col>
            <Col className="Planet-info-col">
                <h4 className='Planet-title'>{name}</h4>
                <p className='Planet-info'>Planet ID: {id}</p>
                <p className='Planet-info'>Population: {currentPopulation}</p>
                <Button className='Planet-select-btn'
                    variant="outline-info"
                    onClick={() => {
                        return selectPlanet(id)
                    }}> Set Destination
                </Button>
            </Col>
        </>
    )
};

export default Planet;