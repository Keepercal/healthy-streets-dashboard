// npm run dev: Locally host the app for development
// npm run deploy: Builds and deploys to live GitHub Pages site

import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import Map from './components/Map/Map';
import Sidebar from'./components/Sidebar/Sidebar';
import Popup from './components/Popup/Popup'
import { fetchWardBoundary } from './services/overpass'
import osmtogeojson  from 'osmtogeojson';

function useWardBoundary(){
  const [boundaryData, setBoundaryData] = useState(null);
  const [boundaryGeojson, setBoundaryGeojson] = useState(null);
  const [condition, setCondition] = useState('idle');
  const [error, setError] = useState(null);

  const reset = () => {
    setBoundaryData(null);
    setBoundaryGeojson(null);
    setCondition('idle');
    setError(null);
  }

  const selectWard = async(value) => {
    setBoundaryData(null);
    setBoundaryGeojson(null);
    setError(null);

    if (value == 'none'){
      setCondition('idle');
      return;
    }

    setCondition('loading');

    try{
      const result = await fetchWardBoundary(value);
      const geojson = osmtogeojson(result);

      setBoundaryData(result);
      setBoundaryGeojson(geojson);
      setCondition('success');

    } catch(err){
      setBoundaryData(null)
      setBoundaryGeojson(null)
      setCondition('error')
      setError(err);
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

export default function App(){
  const {
    boundaryData,
    boundaryGeojson,
    selectWard,
    condition,
    error,
    reset
  } = useWardBoundary()

  const handleDropdown = (key, value) => {
    setDropdowns(prev => ({ ...prev, [key]: value}));
    selectWard(value);
  }

  const [popup, setPopup] = useState({
      trigger: false,
      type: 'loading', // 'idle' | 'loading' | 'error' | 'success'
      title: '',
      message: '',
  });  
  
  const [dropdowns, setDropdowns] = useState({
    ward: 'none'
  });

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

  useEffect(() => {
    if (condition === 'loading') {
      setPopup({
        trigger: true,
        type: 'loading',
        title: 'Loading',
        message: 'Fetching ward data...'
      });
    }

    if (condition === 'success') {
      setPopup({
        trigger: false,
        type: 'idle',
        title: '',
        message: ''
      });
    }

    if (condition === 'error') {
      setPopup({
        trigger: true,
        type: 'error',
        title: 'Error',
        message: error?.message
      });
    }
  }, [condition, error]);

  const handleToggle = (key) => {
    setToggles({...toggles, [key]: !toggles[key]});
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
            type: 'idle',
            title: '',
            message: ''
          })

          reset();
          setDropdowns({ ward: 'none'});
        }}
      />
      
      <div className="side-bar">
        <Sidebar 
          handleDropdown={handleDropdown}
          handleToggle={handleToggle}
          boundaryData={boundaryData}
          dropdowns={dropdowns}
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