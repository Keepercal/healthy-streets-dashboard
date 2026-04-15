import { createRoot } from 'react-dom/client';
import App from '../../App';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON, useMap, Marker, Popup } from 'react-leaflet';
import L from "leaflet";

var pinIcon = L.icon({
  iconUrl: './assets/pins/pinGreen.svg',

  iconSize: [30, 30],
  iconAnchor: [15, 30],
})

function FitBounds({boundary}) {
  const map = useMap();

  useEffect(() => {
    if (!boundary) return;

    const layer = L .geoJSON(boundary);
    const bounds = layer.getBounds();

    if (bounds.isValid()){
      map.fitBounds(bounds, {
        padding: [20, 20],
        maxZoom: 16,
      });
    }
  }, [boundary, WeakMap]);

  return null;
}

function Map({ boundary, features }){
  const position = [51.4538, -2.5918]

  return(
    <div className="map-container">
      <MapContainer center={position} zoom={13} style={{height: "100vh", width: "100%", position: 'fixed'}}>
        <TileLayer
          attribution='© OpenStreetMap contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />  
        {features && (
          <GeoJSON
            data={features}
            pointToLayer={(feature, latlng) => {
              return L.marker(latlng, {icon:pinIcon});
            }}
          />
        )}
        {boundary && (
          <>
            <GeoJSON
              data={boundary}
              style={{
                color: "red",
                weight: 2,
                fillOpacity: 0.05,
              }}
            />
            <FitBounds boundary={boundary}/>
          </>
        )}
      </MapContainer>
    </div>
  );
}

export default Map;