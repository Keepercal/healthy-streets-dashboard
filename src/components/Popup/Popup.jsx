import './popup.css';
import {BarLoader} from "react-spinners";

function Popup({ trigger, type, title, message, onClose, chilren}) {
    if (!trigger) return null;

    return (
        <div className="popup">
            <div className="popup-inner">

                <button className="close-btn" onClick={onClose}>
                    Close
                </button>

                {/* Header */}
                {title && <h3 className={`popup-title ${type}`}>{title}</h3>}

                {/* Message */}
                {message &&(
                    <p className={`popup-message ${type}`}>
                        {message}
                    </p>
                )}

                {type === 'loading' &&(
                    <BarLoader/>
                )}

                {/* Optional custom content */}
            </div>
        </div>
    );
}

export default Popup;