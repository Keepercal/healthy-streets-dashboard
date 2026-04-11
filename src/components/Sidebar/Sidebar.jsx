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
            { value: 'ashleyDown', label: 'Ashley Down' },
        ],
    },
];

const wayOptions = [
    { tag: 'highway', key: 'cycleway', label: 'Cycle Ways'},
    { tag: 'highway, bicycle', key: 'footway, yes', label: 'Shared-Use Footways'},
    { tag: 'traffic_intervention', key: 'school_street', label: 'School Streets'},
];

/*const crossingOptions = [
    { tag: 'crossing', key: 'controlled', label: 'Controlled Crossings'},
    { tag: 'crossing', key: 'uncontrolled', label: 'Uncontrolled Crossings'},
    { key: 'unmarkedCrossings', label: 'Unmarked Crossings'},
]*/

const crossingOptions = [
    { tag: 'crossing_ref', key: 'zebra', label: 'Zebra'},
    { tag: 'crossing_ref', key: 'tiger', label: 'Parallel (Tiger)'},
    { tag: 'crossing_ref', key: 'pelican', label: 'Pelican'},
    { tag: 'crossing_ref', key: 'puffin', label: 'Puffin'},
    { tag: 'crossing_ref', key: 'toucan', label: 'Toucan'},
    { tag: 'crossing_ref', key: 'pegasus', label: 'Equestrian (Pegasus)'},
]

const featureOptions = [
    { tag: 'amenity', key: 'bicycle_parking', label: 'Bicycle Parking'},
    { tag: 'amenity', key: 'bench', label: 'Benches'},
    { tag: 'tourism', key: 'artwork', label: 'Artwork'},
    { tag: 'tourism', key: 'information', label: 'Wayfinding'},
];

const DropdownItem = ({label, value, options, onChange}) => {
    return (
        <div className="dropdown-item">
            <label>
                <select className="dropdown-btn" value={value} onChange={(e) => onChange(e.target.value)}>
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

const Sidebar = ({ handleDropdown, boundaryData, dropdowns }) => {

    const [toggles, setToggles] = useState({
        cycleWays: false,
        sharedUseFootway: false,
        schoolStreets: false,
        controlledCrossings: false,
        uncontrolledCrossings: false,
        unmarkedCrossings: false,
        cycleParking: false,
        benches: false,
        artwork: false,
        wayfinding: false,
    });

    const handleToggle = (key) => {
        setToggles({...toggles, [key]: !toggles[key]});
    };

    return (
        <div className="sidebar">

            <h2>Select Ward</h2>

            {/* Create a dropdown feature to select a Ward */}
            {dropdownOptions.map((dd) =>(
                <DropdownItem
                    key={dd.key}
                    label={dd.label}
                    value={dropdowns[dd.key]}
                    options={dd.options}
                    onChange={(value) => handleDropdown(dd.key, value)}
                />
            ))}
            
            {/* Show the list of options if a Ward is returned and the Overpass API returned the Ward boundary */}
            {boundaryData && (
                <>
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
                </>
            )}
        </div>
    );
};

export default Sidebar;