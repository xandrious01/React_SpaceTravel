import React from "react";
import { Button } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";

const NewShipBtn = () => {
    const style = { display: 'block',
                    textDecoration : 'none',
                    fontSize: '1.6rem',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginBottom: '20px',
                    marginTop: '20px'}
    const linkStyle = {textDecoration: 'none'};
    return (
        <div>
            <Row>
                    <Link style={style}
                    to='/spacecraft/build'>
                        <Button
                            style={style}
                            className='btn Spacecrafts-btn'
                            variant="outline-info">Build New Ship</Button>
                    </Link>
            </Row>
        </div>
    )
}

export default NewShipBtn;

