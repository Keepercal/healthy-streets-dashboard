import { createRoot } from 'react-dom/client';
import App from './App';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Map(){
  const position = [51.4538, -2.5918]

  return(
    <div className="map-container">
      <MapContainer center={position} zoom={13} style={{height: "100vh", width: "100%"}}>
        <TileLayer attribution='© OpenStreetMap contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        <Marker position={position}>
          <Popup>
            Hello from Bristol!
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <App />
);

export default Map;