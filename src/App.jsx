// npm run dev: Locally host the app for development
// npm run deploy: Builds and deploys to live GitHub Pages site
import osmtogeojson  from 'osmtogeojson';
import Map from './components/Map/Map';
import Sidebar from'./components/Sidebar/Sidebar';
import Popup from './components/Popup/Popup';
import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import { WARD_MAP } from "./config/wardMap.js" ;
import { FEATURE_MAP } from "./config/featureMap.js";
import { fetchWardBoundary, fetchMapFeature } from './services/overpass';

// Fetch ward boundary from OSM
function useWardBoundary(){
  const [boundaryData, setBoundaryData] = useState(null);
  const [boundaryGeojson, setBoundaryGeojson] = useState(null);
  const [condition, setCondition] = useState('idle');
  const [error, setErrorMessage] = useState(null);

  // Helper to reset states
  const reset = () => {
    setBoundaryData(null);
    setBoundaryGeojson(null);
    setCondition('idle');
    setErrorMessage(null);
  }

  // When user clicks on a ward option
  const selectWard = async(value) => {
    setBoundaryData(null);
    setBoundaryGeojson(null);
    setErrorMessage(null);

    if (value == 'none'){
      setCondition('idle');
      return;
    }

    setCondition('loading');

    try{
      const result = await fetchWardBoundary(value); // Fetching from Overpass API
      const geojson = osmtogeojson(result); // Convert to GeoJSON

      setBoundaryData(result);
      setBoundaryGeojson(geojson);
      setCondition('success');

    } catch(err){
      setBoundaryData(null)
      setBoundaryGeojson(null)
      setCondition('error')
      setErrorMessage(err);
    }
  };

  return {
    boundaryData,
    boundaryGeojson,
    selectWard,
    condition,
    error,
    reset
  };
}

// Fetch features from OSM
function useMapFeature(wardName){
  const [featureData, setFeatureData] = useState(null);
  const [featureGeojson, setFeatureGeojson] = useState(null);
  const [condition, setCondition] = useState('idle');
  const [error, setErrorMessage] = useState(null);

  // Helper to reset states
  const reset = () => {
    setFeatureData(null);
    setFeatureGeojson(null);
    setCondition('idle');
    setErrorMessage(null);
  }

  // When user clicks on a feature toggle
  const selectMapFeature = async(ward, value) => {
    setFeatureData(null);
    setFeatureGeojson(null);
    setCondition('idle');
    setErrorMessage(null)

    // If null, hide the popup
    if (value === null){
      setCondition('idle');
      return;
    }

    // Show the loading popup
    setCondition('loading');

    try{
      const result = await fetchMapFeature(ward, value); // Call function which interacts with Overpass API
      const geojson = osmtogeojson(result); // Convert the result to GeoJSON

      setFeatureData(result); // Store raw result
      setFeatureGeojson(geojson); // Store result in GeoJSON
      setCondition('success'); // Hide popup
    } catch(err){
      setFeatureData(null);
      setFeatureGeojson(null);
      setCondition('error');
      setErrorMessage(err)
    }
  };

  return {
    featureData,
    featureGeojson,
    selectMapFeature,
    condition,
    error,
    reset
  }

}

export default function App(){
  const [selectedWard, setSelectedWard] = useState('none'); // Clear the selected ward

  // Deconstruct ward return value
  const {
    boundaryData,
    boundaryGeojson,
    selectWard,
    condition,
    error,
    reset
  } = useWardBoundary()

  // Deconstruct feature return value
  const {
    featureData,
    featureGeojson,
    selectMapFeature,
    condition: featureCondition,
    error: featureError,
    reset: resetFeature
  } = useMapFeature(selectedWard)

  // When an option in the dropdown is clicked
  const handleDropdown = (key, value) => {
    setSelectedWard(prev => ({ ...prev, [key]: value})); // Change the label shown on the dropdown
    setSelectedWard(value) // Update state with the selected ward
    selectWard(value); // Call the select ward function to fetch ward from Overpass API
  }

  // When an option from the list of toggles is clicked
  const handleToggle = (key, value) => {
    setToggles({...toggles, [key]: !toggles[key]});
    selectMapFeature(selectedWard, value);
  };

  // Turn ward options map into an array
  const wardOptions = [
    { value: "none", label: "None" },
    ...Object.entries(WARD_MAP).map(([key, ward]) => ({
      value: key,
      label: ward.label
    }))
  ]

  // Turn feature options map into an array
  const featureOptions = [
    { value: 'none', label: "None" },
    ...Object.entries(FEATURE_MAP).map(([key, feature]) => ({
      value: key,
      tag: feature.tag,
      label: feature.label,
      group: feature.group
    }))
  ]

  // Set the popup to idle 
  const [popup, setPopup] = useState({
      trigger: false,
      type: 'idle', // 'idle' | 'loading' | 'error' | 'success'
      title: '',
      message: '',
  });  

  // Default feature toggles to False (Off)
  const [toggles, setToggles] = useState({
        cycleway: false,
        footway: false,
        school_street: false,
        zebra: false,
        tiger: false,
        pelican: false,
        puffin: false,
        toucan: false,
        pegasus: false,
        bicycle_parking: false,
        bench: false,
        artwork: false,
        information: false,
    });
  
  // Handles the popups depending on the type of popup
  useEffect(() => {
    if (condition === 'loading') { // Loading
      setPopup({
        trigger: true,
        type: 'loading',
        title: 'Loading',
        message: 'Fetching ward data...'
      });
    }

    if (condition === 'success') { // Success
      setPopup({
        trigger: false,
        type: 'idle',
        title: '',
        message: ''
      });
    }

    if (condition === 'error') { // Error
      setPopup({
        trigger: true,
        type: 'error',
        title: 'Error',
        message: error?.message
      });
    }
  }, [condition, error]);

  return(
    <div className="App">
      <Popup 
        trigger={popup.trigger}
        type={popup.type}
        title={popup.title}
        message={popup.message}

        onClose={() => { // When the close button is pressed, change the popup state
          setPopup({
            trigger: false,
            type: 'idle',
            title: '',
            message: ''
          })

          reset();
          setSelectedWard({ ward: 'none' });
        }}
      />
      
      <div className="side-bar">
        <Sidebar 
          handleDropdown={handleDropdown}
          handleToggle={handleToggle}

          wardOptions={wardOptions}
          featureOptions={featureOptions}
          boundaryData={boundaryData}
          featureData={featureData}

          selectedWard={selectedWard}
          toggles={toggles}
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

createRoot(document.getElementById('root')).render(
  <App />
);