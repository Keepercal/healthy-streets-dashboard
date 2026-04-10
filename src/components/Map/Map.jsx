import { createRoot } from 'react-dom/client';
import App from '../../App';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';

function Map({ wardBoundary }){
  const position = [51.4538, -2.5918]

  return(
    <div className="map-container">
      <MapContainer center={position} zoom={13} style={{height: "100vh", width: "100%"}}>
        <TileLayer attribution='© OpenStreetMap contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {wardBoundary && (
          <GeoJSON
            data={wardBoundary}
            style={{
              color: "red",
              weight: 2,
              fillOpacity: 0.05,
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <App />
);

export default Map;