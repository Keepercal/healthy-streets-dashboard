import './popup.css'

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

                {/* Optional custom content */}
            </div>
        </div>
    );
}

export default Popup;