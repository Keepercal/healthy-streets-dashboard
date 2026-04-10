import './popup.css'

function Popup({ trigger, error, onClose, children }) {
    return trigger ? (
        <div className="popup">
            <div className="popup-inner">

                <button className="close-btn" onClick={onClose}>
                    close
                </button>

                {error ? (
                    <div className="popup-error">
                        <h3>Error</h3>
                        <p>{error}</p>
                    </div>
                ) : (
                    children
                )}
            </div>
        </div>
    ) :  null;
}

export default Popup