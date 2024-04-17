import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SpaceTravelApi from "../services/SpaceTravelApi";
import '../styles/BuildShip.css';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from "react-router-dom";



const BuildShip = () => {
    const { buildSpacecraft } = SpaceTravelApi;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        capacity: 0,
        description: "",
        pictureUrl: ""
    });
    const [validated, setValidated] = useState(false);


    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        setValidated(true);
        if (form.checkValidity() === true){
          buildSpacecraft({ ...formData, capacity: formData.capacity * 1 });
            navigate('/spacecrafts');  
        }
        
    };

    return (
        <Container className="BuildShip-div">
            <Form noValidate
                validated={validated}
                className="BuildShip-form"
                onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="spacecraftFormName">
                    <Form.Label className="BuildShip-form-label">Vehicle Name</Form.Label>
                    <Form.Control
                        name="name"
                        type="text"
                        placeholder="Give your spaceship a name"
                        pattern="^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        isInvalid={
                            validated && formData.name.length < 2 && 	!/^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/.test(formData.name)
                        }
                    />
                    <Form.Control.Feedback className="BuildShip-form-msg"
                        type="invalid">
                    Please enter a valid name.
                    </Form.Control.Feedback>

                </Form.Group>



                <Form.Group className="mb-3" controlId="spacecraftFormCapacity">
                    <Form.Label
                        className="BuildShip-form-label"
                    >Vehicle Capacity</Form.Label>
                    <Form.Control
                        name="capacity"
                        type="number"
                        placeholder={0}
                        value={formData.capacity}
                        onChange={handleChange}
                        required
                        isInvalid={
                            validated && formData.capacity*1 <= 0
                        }
                    />
                    <Form.Control.Feedback className="BuildShip-form-msg"
                    type="invalid">
                        Please enter ship capacity.
                    </Form.Control.Feedback>
                </Form.Group>



                <Form.Group className="mb-3" controlId="spacecraftFormDescription">
                    <Form.Label
                        className="BuildShip-form-label"
                    >Ship Description</Form.Label>
                    <Form.Control
                        name="description"
                        type="text"
                        placeholder="Enter spaceship description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        isInvalid={
                            validated && formData.name.length < 2
                        }
                    />
                    <Form.Control.Feedback className="BuildShip-form-msg"
                    type="invalid">
                        Please add a ship description.
                    </Form.Control.Feedback>
                </Form.Group>


                <Form.Group className="mb-3" controlId="spacecraftFormImgUrl">
                    <Form.Label
                        className="BuildShip-form-label"
                    >Ship Image</Form.Label>
                    <Form.Control
                        name="pictureUrl"
                        type="url"
                        placeholder="Enter image URL (optional)"
                        value={formData.pictureUrl}
                        onChange={handleChange} />
                </Form.Group>

                <Button
                    className="BuildShip-btn"
                    variant="info"
                    type="submit">
                    Create Spacecraft
                </Button>
            </Form>
            <div>
                <Link to='/spacecrafts' className="Link">
                    <Button
                        className="BuildShip-btn"
                        variant="outline-info">Return to Spacecrafts Page</Button>
                </Link>
            </div>

        </Container>

    )

};

export default BuildShip;
