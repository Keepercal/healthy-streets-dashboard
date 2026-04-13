import './Sidebar.css';

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

const renderGroup = (groupName, feature, toggles, handleToggle) => {
    return (feature ? Object.entries(feature) : [])
        .filter(([key, feature]) => feature.group === groupName)
        .map(([key, feature]) => (
            <ToggleItem
                key={key}
                tag={feature.tag}
                label={feature.label}
                checked={toggles[key]}
                onChange={() => handleToggle(key)}
            />
    ))
}

const Sidebar = ({ handleDropdown, handleToggle, boundaryData, selectedWard, toggles, wardOptions, featureOptions }) => {
    return (
        <div className="sidebar">

            <h2>Select Ward</h2>

            {/* Create a dropdown feature to select a Ward */}
            <DropdownItem
                key={wardOptions.key}
                label={wardOptions.label}
                value={selectedWard}
                options={wardOptions}
                onChange={(value) => handleDropdown(wardOptions.key, value)}
            />
            
            {/* Show the list of options if a Ward is returned and the Overpass API returned the Ward boundary */}
            {boundaryData && (
                <>
                    <h2>Ways</h2>
                    {renderGroup("ways", featureOptions, toggles, handleToggle)}

                    <h2>Crossings</h2>
                    {renderGroup("crossings", featureOptions, toggles, handleToggle)}

                    <h2>Features</h2>
                    {renderGroup("features", featureOptions, toggles, handleToggle)}
                </>
            )}
        </div>
    );
};

export default Sidebar;