import React from "react";
import '../styles/ErrorMsg.css'

const ErrorMsg = () => {
    return (
        <div className="Error-div">
            <p className="Error-text">
                Error connecting to network. Please reload page and try again.
            </p>
        </div>
    )
}

export default ErrorMsg;