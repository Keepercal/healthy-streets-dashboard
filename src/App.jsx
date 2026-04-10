import { useState } from 'react';
import Map from './Map';
import Sidebar from'./components/Sidebar/Sidebar';
import Popup from './components/Popup/Popup'
import { fetchWardBoundary } from './services/overpass'
import osmtogeojson  from 'osmtogeojson';

export default function App(){
  const [boundaryData, setBoundaryData] = useState(null);
  const [boundaryGeojson, setBoundaryGeojson] = useState(null);

  const [popup, setPopup] = useState({
    trigger: false,
    type: 'loading', // 'loading' | 'error' | 'success'
    title: '',
    message: '',
  });

  const [dropdowns, setDropdowns] = useState({
    ward: 'none'
  });

  // When an option is selected from the dropdown
  const handleDropdown = async (key, value) => {
    setDropdowns(dropdowns => ({...dropdowns, [key]: value}))

    setBoundaryData(null);
    setBoundaryGeojson(null);

    // if None is selected, clear all variables
    if (value === 'none') {
      setBoundaryData(null);
      setPopup(p => ({...p, trigger: false}));
      return;
    }

    // 1. Show LOADING popup
    setPopup({
      trigger: true,
      type: 'loading',
      title: 'Loading...',
      message: 'Fetching ward data'
    });

    // fetch the boundary
    try{
      const result = await fetchWardBoundary(value); // fetch ward boundary data

      setBoundaryData(result); // put the boundary result into the result variable

      const geojson = osmtogeojson(result) // convert the JSON into a GeoJSON format that Leaflet can read
      setBoundaryGeojson(geojson)

      // 2. Auto clear when result is found
      setTimeout(() => {
        setPopup({
          trigger: false,
          type: 'loading',
          title: '',
          message: ''
        }, 1000);
      })

    } catch (err) { // if an error is encountered when fetching boundary
      console.error(err)

      setBoundaryData(null);
      setBoundaryGeojson(null);
      
      // 3. Show ERROR popup
      setPopup({
        trigger: true,
        type: 'error',
        title: 'Error',
        message: err.message || 'Failed to load boundary data'
      });
    }
  };

  return(
    <div className="App">

      <Popup 
        trigger={popup.trigger}
        type={popup.type}
        title={popup.title}
        message={popup.message}

        onClose={() => {
          setPopup({
            trigger: false,
            type: 'info',
            title: '',
            message: ''
          })

          setBoundaryData(null);
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
        <Map 
          wardBoundary={boundaryGeojson}
        />
      </div>
    </div>
  );
}