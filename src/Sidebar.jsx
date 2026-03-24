import React, {useState} from 'react';
import './Sidebar.css'

const sidebarOptions = [
    { key: 'option1', label: 'Option 1'},
    { key: 'option2', label: 'Option 2'},
    { key: 'option3', label: 'Option 3'},
];

const ToggleItem = ({label, checked, onChange}) => {
    return(
        <div className="toggle-item">
            <label>
                <input 
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                />
            {label}
            </label>
        </div>
    )
};

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
            
            {sidebarOptions.map((opt) => (
                <ToggleItem
                    key={opt.key}
                    label={opt.label}
                    checked={toggles[opt.key]}
                    onChange={() => handleToggle(opt.key)}
                />
            ))}
        </div>
    );
};

export default Sidebar;