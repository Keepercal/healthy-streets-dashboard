import React, {useState} from 'react';
import './Sidebar.css'

const dropdownOptions = [
    {
        key: 'ward',
        label: 'Select Ward',
        options: [
            { value: 'none', label: 'None' },
            { value: 'southville', label: 'Southville' },
            { value: 'bedminster', label: 'Bedminster' },
            { value: 'windmillHill', label: 'Windmill Hill' },
        ],
    },
];

const wayOptions = [
    { key: 'cycleWays', label: 'Cycle Ways'},
    { key: 'sharedUseFootway', label: 'Shared-Use Footway'},
    { key: 'schoolStreets', label: 'School Streets'},
];

const crossingOptions = [
    { key: 'controlledCrossings', label: 'Controlled Crossings'},
    { key: 'uncontrolledCrossings', label: 'Uncontrolled Crossings'},
    { key: 'unmarkedCrossings', label: 'Unmarked Crossings'},
]

const featureOptions = [
    { key: 'cycleParking', label: 'Cycle Parking'},
    { key: 'benches', label: 'Benches'},
    { key: 'artwork', label: 'Artwork'},
    { key: 'wayfinding', label: 'Wayfinding'},
];

const DropdownItem = ({label, value, options, onChange}) => {
    return (
        <div className="dropdown-item">
            <label>
                <select value={value} onChange={(e) => onChange(e.target.value)}>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    )
}   

const ToggleItem = ({label, checked, onChange}) => {
    return(
        <div className="toggle-item">
            <label>
                {label}
                <input 
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                />
            </label>
        </div>
    )
};

const Sidebar = () => {
    const [dropdowns, setDropdowns] = useState({
        theme: 'light',
        fontSize: 'medium'
    })

    const [toggles, setToggles] = useState({
        option1: false,
        option2: false,
        option3: false,
    });

    const handleDropdown = key => {
        setDropdowns({...dropdowns,[key]: value,})
    }

    const handleToggle = (key) => {
        setToggles({...toggles, [key]: !toggles[key]});
    };

    return (
        <div className="sidebar">
            <h2>Select Ward</h2>

            {dropdownOptions.map((dd) =>(
                <DropdownItem
                    key={dd.key}
                    label={dd.label}
                    value={dropdowns[dd.key]}
                    options={dd.options}
                    onChange={(value) => handleDropdown(dd.key, value)}
                />
            ))}

            <h2>Ways</h2>
            
            {wayOptions.map((opt) => (
                <ToggleItem
                    key={opt.key}
                    label={opt.label}
                    checked={toggles[opt.key]}
                    onChange={() => handleToggle(opt.key)}
                />
            ))}

            <h2>Crossings</h2>
            {crossingOptions.map((opt) => (
                <ToggleItem
                    key={opt.key}
                    label={opt.label}
                    checked={toggles[opt.key]}
                    onChange={() => handleToggle(opt.key)}
                />
            ))}

            <h2>Features</h2>

            {featureOptions.map((opt) => (
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