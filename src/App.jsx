// npm run dev: Locally host the app for development
// npm run deploy: Builds and deploys to live GitHub Pages site
import osmtogeojson  from 'osmtogeojson';
import Map from './components/Map/Map';
import Sidebar from'./components/Sidebar/Sidebar';
import Popup from './components/Popup/Popup';
import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import { BOUNDARY_MAP } from "./config/boundaryMap.js" ;
import { FEATURE_MAP } from "./config/featureMap.js";
import { fetchBoundary, fetchMapFeature } from './services/overpass';

// Fetch boundary from OSM
function useBoundary(){
  const [boundaryData, setBoundaryData] = useState(null);
  const [boundaryGeojson, setBoundaryGeojson] = useState(null);
  const [condition, setCondition] = useState('idle');
  const [error, setErrorMessage] = useState(null);

  const clearBoundary = async() => {
    console.log("ENTER clearBoundary")
    setBoundaryData(null)
    setBoundaryGeojson(null)
    setCondition('idle')
    setErrorMessage(null)

    console.log({boundaryData, boundaryGeojson, condition})
  }

  // When user clicks on a boundary option
  const loadBoundary = async(value) => {
    console.log("ENTER loadBoundary", {value})
    clearBoundary(); // Reset states

    if (value == 'none'){
      console.debug("null")
      setCondition('idle');
      return;
    }

    setCondition('loading');

    try{
      console.log("calling fetchBoundary", {value});
      const result = await fetchBoundary(value); // Fetching from Overpass API
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
    clearBoundary,
    loadBoundary,
    condition,
    error,
  };
}

// Fetch features from OSM
function useMapFeature(boundaryName){
  const [featureData, setFeatureData] = useState(null);
  const [featureGeojson, setFeatureGeojson] = useState(null);
  const [condition, setCondition] = useState('idle');
  const [error, setErrorMessage] = useState(null);

  const clearFeatures = async() => {
    console.log("ENTER clearFeatures")
    setFeatureData(null)
    setFeatureGeojson(null)
    setCondition('idle')
    setErrorMessage(null)

    console.log({featureData, featureGeojson, condition})
  }

  // When user clicks on a feature toggle
  const loadFeatures = async(boundary, tag, value) => {
    console.log("ENTER loadFeatures", {boundary, tag, value})
    clearFeatures();

    // If null, hide the popup
    if (value === null){
      console.log("null")
      setCondition('idle');
      return;
    }

    // Show the loading popup
    setCondition('loading');

    try{
      console.log("calling fetchMapFeature", {boundary, tag, value});
      const result = await fetchMapFeature(boundary, tag, value); // Call function which interacts with Overpass API
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
    loadFeatures,
    clearFeatures,
    condition,
    error,
  }

}

export default function App(){
  const [selectedBoundary, setSelectedBoundary] = useState('none'); // Default the dropdown to None
  const [toggles, setToggles] = useState({}); // Default the toggles to false (off)

  // Deconstruct boundary return value
  const {
    boundaryData,
    boundaryGeojson,
    loadBoundary,
    condition: boundaryCondition,
    error: boundaryError,
    reset: resetBoundary
  } = useBoundary()

  // Deconstruct feature return value
  const {
    featureData,
    featureGeojson,
    loadFeatures,
    clearFeatures,
    condition: featureCondition,
    error: featureError,
  } = useMapFeature(selectedBoundary)

  // Update the selected boundary state when a dropdown option is chosen
  const handleDropdown = (key, value) => {
    console.log("ENTER handleDropdown:", {key, value});
    setSelectedBoundary(value);
    console.log("calling loadBoundary", {key, value})
    loadBoundary(value);
  }

  // When an option from the list of toggles is clicked
  const handleToggle = (key, tag, value) => {
    console.log("ENTER handleToggle:", {key, tag, value});
    setToggles(prev => {
      const nextValue = !(prev[key] ?? false);

      if (nextValue){
        console.log("calling loadFeatures", {selectedBoundary, key, value})
        loadFeatures(selectedBoundary, tag, value);
      } else{
        console.log("clearing features")
        clearFeatures();
      }
      
      return {
        ...prev,
        [key]: nextValue
      };
    });
  };

  // Turn boundary options map into an array
  const boundaryOptions = [
    { value: "none", label: "None" },
    ...Object.entries(BOUNDARY_MAP).map(([key, boundary]) => ({
      value: key,
      label: boundary.label
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

  // Handles the popups depending on the type of popup
  useEffect(() => {
    if (boundaryCondition === 'loading') { // Loading
      setPopup({
        trigger: true,
        type: 'loading',
        title: 'Loading',
        message: 'Fetching boundary data...'
      });
    }
    if (boundaryCondition === 'success') { // Success
      setPopup({
        trigger: false,
        type: 'idle',
        title: '',
        message: ''
      });
    }
    if (boundaryCondition === 'error') { // Error
      setPopup({
        trigger: true,
        type: 'error',
        title: 'Error',
        message: boundaryError?.message
      });
    }
  }, [boundaryCondition, boundaryError]);

  useEffect(() => {
    if (featureCondition === 'loading') { // Loading
      setPopup({
        trigger: true,
        type: 'loading',
        title: 'Loading',
        message: 'Fetching feature data...'
      });
    }
    if (featureCondition === 'success') { // Success
      setPopup({
        trigger: false,
        type: 'idle',
        title: '',
        message: ''
      });
    }
    if (featureCondition === 'error') { // Error
      setPopup({
        trigger: true,
        type: 'error',
        title: 'Error',
        message: featureError?.message
      });
    }
  }, [featureCondition, featureError]);

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
        }}
      />
      
      <div className="side-bar">
        <Sidebar 
          handleDropdown={handleDropdown}
          handleToggle={handleToggle}

          boundaryOptions={boundaryOptions} // Boundary map
          featureOptions={featureOptions} // Feature map

          boundaryData={boundaryData}
          featureData={featureData}

          selectedBoundary={selectedBoundary}
          toggles={toggles}
        />
      </div>
      <div className="main-content">
        <Map 
          boundary={boundaryGeojson} // The boundary in GeoJSON format
          features={featureGeojson}
        />
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <App />
);