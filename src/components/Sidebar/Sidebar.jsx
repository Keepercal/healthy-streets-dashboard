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
                {label}
                <input 
                    type="checkbox"
                    checked={!!checked}
                    onChange={onChange}
                />
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
                checked={toggles[key]}
                onChange={() => handleToggle(key, featureOptions.tag, featureOptions.value)}
            />
    ))
}

const Sidebar = ({ handleDropdown, handleToggle, boundaryData, selectedBoundary, toggles, boundaryOptions, featureOptions }) => {
    return (
        <div className="sidebar">

            <h2>Select Boundary</h2>

            {/* Create a dropdown feature to select a Boundary */}
            <DropdownItem
                key={selectedBoundary}
                label={boundaryOptions.label}
                //value={selectedBoundary}
                options={boundaryOptions}
                onChange={(key) => handleDropdown(boundaryOptions.key, key)}
            />
            
            {/* Show the list of options if a Boundary is returned and the Overpass API returned the Ward boundary */}
            {boundaryData && (
                <>
                    <h2>Ways</h2>
                    {renderGroup("ways", featureOptions, toggles, handleToggle)}

                    <h2>Crossings</h2>
                    {renderGroup("crossings", featureOptions, toggles, handleToggle)}

                    <h2>Street Furniture</h2>
                    {renderGroup("streetFurniture", featureOptions, toggles, handleToggle)}
                </>
            )}
        </div>
    );
};

export default Sidebar;