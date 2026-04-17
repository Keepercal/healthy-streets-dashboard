// npm run dev: Locally host the app for development
// npm run deploy: Builds and deploys to live GitHub Pages site
import Map from './components/Map/Map';
import Sidebar from './components/Sidebar/Sidebar';
import Popup from './components/Popup/Popup';

import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import { useBoundary, useMapFeature } from './hooks/useMapData.js'

import { BOUNDARY_MAP } from "./config/boundaryMap.js";
import { FEATURE_MAP } from "./config/featureMap.js";

export default function App() {
  const [selectedBoundary, setSelectedBoundary] = useState('none'); // Default the dropdown to None
  const [toggles, setToggles] = useState({}); // Default the toggles to false (off)

  // Set the popup to idle 
  const [popup, setPopup] = useState({
    trigger: false,
    type: 'idle', // 'idle' | 'loading' | 'error' | 'success'
    source: null, // 'boundary' | 'feature'
    title: '',
    message: '',
  });

  // Deconstruct boundary return value
  const {
    boundaryData,
    boundaryGeojson,
    loadBoundary,
    clearBoundary,
    condition: boundaryCondition,
    error: boundaryError,
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
    console.log("ENTER handleDropdown:", { key, value });
    clearFeatures();
    loadBoundary(value);
    console.log("calling loadBoundary", { key, value })
    setSelectedBoundary(value);
    setToggles({});
  }

  // When an option from the list of toggles is clicked
  const handleToggle = (key, tag, value, type) => {
    console.log("ENTER handleToggle:", { key, tag, value, type });
    setToggles({})
    const nextValue = !toggles[key];

    setToggles(prev => ({
      ...prev,
      [key]: nextValue
    }));

    if (nextValue) {
      console.log("calling loadFeatures", { selectedBoundary, tag, value, type })
      loadFeatures(selectedBoundary, tag, value, type);
    } else {
      clearFeatures();
    }
  }

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
      group: feature.group,
      type: feature.type,
    }))
  ]

  // Handles the popups depending on the type of popup
  useEffect(() => {
    if (boundaryCondition === 'loading') { // Loading
      setPopup({
        trigger: true,
        type: 'loading',
        source: 'boundary',
        title: 'Loading',
        message: 'Fetching boundary data...'
      });
    }
    if (boundaryCondition === 'success') { // Success
      setPopup({
        trigger: false,
        type: 'idle',
        source: 'boundary',
        title: '',
        message: ''
      });
    }
    if (boundaryCondition === 'error') { // Error
      setPopup({
        trigger: true,
        type: 'error',
        source: 'boundary',
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
        source: 'feature',
        title: 'Loading',
        message: 'Fetching feature data...'
      });
    }
    if (featureCondition === 'success') { // Success
      setPopup({
        trigger: false,
        type: 'idle',
        source: 'feature',
        title: '',
        message: ''
      });
    }
    if (featureCondition === 'error') { // Error
      setPopup({
        trigger: true,
        type: 'error',
        source: 'feature',
        title: 'Error',
        message: featureError?.message
      });
    }
  }, [featureCondition, featureError]);

  return (
    <div className="App">
      <Popup
        trigger={popup.trigger}
        type={popup.type}
        title={popup.title}
        message={popup.message}

        onClose={() => { // When the close button is pressed, change the popup state
          setPopup(prev => ({
            ...prev,
            trigger: false
          }));

          if (popup.source === 'boundary') {
            // Reset everything related to boundary
            setSelectedBoundary('none');
            clearBoundary();
            clearFeatures();
            setToggles({});
          }

          if (popup.source === 'feature') {
            // Only reset feature related states
            clearFeatures();
            setToggles({});
          }
        }}
      />

      <div className="side-bar">
        <Sidebar
          handleDropdown={handleDropdown}
          handleToggle={handleToggle}

          boundaryOptions={boundaryOptions} // Boundary map
          featureOptions={featureOptions} // Feature map

          boundaryData={boundaryData} // Pass along data relating to the boundary
          featureData={featureData} // Pass along data relating to features

          selectedBoundary={selectedBoundary} // Flag containing the selected boundary
          toggles={toggles} // Menu options
        />
      </div>
      <div className="main-content">
        <Map
          boundary={boundaryGeojson} // The boundary in GeoJSON format
          features={featureGeojson} // The features in GeoJSON format
        />
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <App />
);