import './Sidebar.css';

const DropdownItem = ({value, options, onChange}) => {
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
                <input 
                    type="checkbox"
                    checked={!!checked}
                    onChange={onChange}
                />
                {label}
            </label>
        </div>
    )
};

const renderGroup = (groupName, featureOptions, toggles, handleToggle) => {
    return (featureOptions ? Object.entries(featureOptions) : [])
        .filter(([_, featureOptions]) => featureOptions.group === groupName)
        .map(([key, featureOptions]) => (
            <ToggleItem
                key={key}
                tag={featureOptions.tag}
                label={featureOptions.label}
                type={featureOptions.type}
                checked={toggles[key]}
                onChange={() => handleToggle(key, featureOptions.tag, featureOptions.value, featureOptions.type)}
            />
    ))
}

const Sidebar = ({ handleDropdown, handleToggle, boundaryData, selectedBoundary, toggles, boundaryOptions, featureOptions }) => {
    return (
        <div className="sidebar"> 
            <div className="sidebar-content">
                <h1 className="sidebar-title">Healthy Streets Dashboard</h1>
                <p className="version-tag">v0.1.0-alpha</p>

                <h2>Select Boundary</h2>

                {/* Create a dropdown feature to select a Boundary */}
                <DropdownItem
                    key={selectedBoundary}
                    label={boundaryOptions.label}
                    value={selectedBoundary}
                    options={boundaryOptions}
                    onChange={(key) => handleDropdown(boundaryOptions.key, key)}
                />
                
                {/* Show the list of options if a Boundary is returned and the Overpass API returned the Ward boundary */}
                {boundaryData && (
                    <>
                        <h3>Ways</h3>
                        {renderGroup("ways", featureOptions, toggles, handleToggle)}

                        <h3>Crossings</h3>
                        {renderGroup("crossings", featureOptions, toggles, handleToggle)}

                        <h3>Street Furniture</h3>
                        {renderGroup("streetFurniture", featureOptions, toggles, handleToggle)}
                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;