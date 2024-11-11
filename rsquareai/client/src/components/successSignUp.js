import React from 'react';
import './sucessSignUp.css';

function Modal({ message, userName, onClose, onRedirect }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <h3>{message}</h3>
                <p>User: {userName}</p>
                <button onClick={onRedirect} className="modal-button">Go to Login</button>
            </div>
        </div>
    );
}

export default Modal;
