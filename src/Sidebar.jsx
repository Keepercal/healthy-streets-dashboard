import React, {useState} from 'react';
import './Sidebar.css'

const Sidebar = () => {
    const [toggles, setToggles] = useState({
        option1: false,
        option2: false,
        option3: false,
    });

    const handleToggle = (key) => {
        setToggles({...toggles, [key]: !toggles[key]});
    };

    return (
        <div className="sidebar">
            <h2>Toggles</h2>
            <div className="toggle-item">
                <label>
                    <input 
                        type="checkbox"
                        checked={toggles.option1}
                        onChange={() => handleToggle('option1')}
                    />
                Option 1
                </label>
            </div>
            <div className="toggle-item">
                <label>
                    <input type="checkbox"
                    checked={toggles.option2}
                    onChange={() => handleToggle('option2')}
                    />
                Option 2
                </label>
            </div>
            <div className="toggle-item">
                <label>
                    <input type="checkbox"
                    checked={toggles.option3}
                    onChange={() => handleToggle('option3')}
                    />
                Option 3
                </label>
            </div>
        </div>
    );
};

export default Sidebar;