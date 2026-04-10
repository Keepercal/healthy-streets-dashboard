import { useState } from 'react';
import Map from './Map';
import Sidebar from'./Sidebar';
import Popup from './Popup'
import fetchWardBoundary from './Fetch'

export default function App(){
  const [buttonPopup, setButtonPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [boundaryData, setBoundaryData] = useState(null);
  const [boundaryError, setBoundaryError] = useState(null);

  const [dropdowns, setDropdowns] = useState({
    ward: 'none'
  })

  const handleDropdown = async (key, value) => {
    setDropdowns(dropdowns => ({...dropdowns, [key]: value}))

    // if None is selected, clear all variables
    if (value === 'none') {
      setBoundaryData(null);
      setBoundaryError(null);
      setShowPopup(false);
      return;
    }

    // fetch the boundary
    try{
      setBoundaryError(null);

      const result = await fetchWardBoundary(value);

      setBoundaryData(result);
      setShowPopup(false);
    } catch (err) {
      console.error(err)

      setBoundaryError(err.message || 'Failed to load boundary data');
      setBoundaryData(null);
      setShowPopup(true);
    }
  };

  return(
    <div className="App">

      <Popup 
        trigger={showPopup}
        error={boundaryError}
        onClose={() => {
          setShowPopup(false);
          setBoundaryData(null);
          setBoundaryError(null);
          setDropdowns({ ward: 'none'});
        }}
      />
      
      <div className="side-bar">
        <Sidebar 
          handleDropdown={handleDropdown}
          boundaryData={boundaryData}
          dropdowns={dropdowns}
        />
      </div>
      <div className="main-content">
        <Map />
      </div>
    </div>
  );
}