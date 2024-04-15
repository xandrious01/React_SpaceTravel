import React, {useState} from "react";
import '../styles/LoadingGraphic.css';
import LoadingGif from '../images/loading.gif';

const LoadingGraphic = () => {

    return (
        <div className="Loading-div">
            <img src={LoadingGif}
            className="Loading-gif"
            />
        </div>
    )
}

export default LoadingGraphic;