import App from '../../App';
import 'leaflet/dist/leaflet.css';
import './Map.css'
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import L from "leaflet";

import BoundaryLayer from './BoundaryLayer'
import FeatureLayer from './FeatureLayer'
import FitBounds from './FitBounds'

function Map({ boundary, features }) {
  const position = [51.4538, -2.5918]

  return (
    <div className="map-container">
      <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%", position: 'fixed' }}>
        <TileLayer
          attribution='© OpenStreetMap contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {features && (
          <FeatureLayer features={features} />
        )}
        {boundary && (
          <>
            <BoundaryLayer boundary={boundary} />
            <FitBounds boundary={boundary} />
          </>
        )}
      </MapContainer>
    </div>
  );
}

export default Map;