import { createRoot } from 'react-dom/client';
import App from '../../App';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import './Map.css'
import { MapContainer, TileLayer, GeoJSON, useMap, Marker, Popup } from 'react-leaflet';
import L from "leaflet";

var pinIcon = L.icon({
  iconUrl: './assets/pins/pinGreen.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 30],

  popupAnchor: [0, -30],
})

function FitBounds({ boundary }) {
  const map = useMap();

  useEffect(() => {
    if (!boundary) return;

    const layer = L.geoJSON(boundary);
    const bounds = layer.getBounds();

    if (bounds.isValid()) {
      map.fitBounds(bounds, {
        padding: [20, 20],
        maxZoom: 16,
      });
    }
  }, [boundary]);

  return null;
}

function timeAgo(timestamp){
  const date = new Date(timestamp);
  const now = new Date();

  const diffMs = now - date;

  const minutes = diffMs / (1000 * 60);
  const hours = diffMs / (1000 * 60 * 60);
  const days = diffMs / (1000 * 60 * 60 * 24);
  const months = days / 30.44;
  const years = days / 365.25;

  if (years >= 1){
    const val = Math.floor(years);
    return `${val} year${val !== 1 ? "s" : ""} ago`;
  }
  if (months >= 1){
    const val = Math.floor(months);
    return `${val} month${val !== 1 ? "s" : ""} ago`;
  }
  if (days >= 1){
    const val = Math.floor(days);
    return `${val} day${val !== 1 ? "s" : ""} ago`;
  }
  if (hours >= 1){
    const val = Math.floor(hours);
    return `${val} month${val !== 1 ? "s" : ""} ago`;
  }

  const val = Math.floor(minutes);
  return `${val} minute${val !== 1 ? "s" : ""} ago`;
}

function Map({ boundary, features }) {
  const position = [51.4538, -2.5918]

  const exclude = new Set([
    "id",
    "timestamp",
    "version",
    "changeset",
    "user",
    "uid",
  ]);

  return (
    <div className="map-container">
      <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%", position: 'fixed' }}>
        <TileLayer
          attribution='© OpenStreetMap contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {features && (
          <GeoJSON
            data={features}
            pointToLayer={(feature, latlng) => {
              return L.marker(latlng, { icon: pinIcon });
            }}
            onEachFeature={(feature, layer) => {
              const props = feature.properties || {};
              const lastUser = props.user;
              const container = document.createElement("div");

              const title = document.createElement("div");
              title.innerHTML = `<h3>Tags</h3>`;
              container.appendChild(title);

              Object.entries(props)
                .filter(([k]) => !exclude.has(k))
                .forEach(([key, value]) => {
                  const row = document.createElement("div");
                  row.innerHTML = `<strong>${key}</strong>: ${value}`;
                  container.appendChild(row);
                });
              if (props.timestamp) {
                const formattedDate = new Date(props.timestamp).toLocaleDateString("eb-GB");
                const timeAgoText = timeAgo(props.timestamp);

                const editedRow = document.createElement("div");
                editedRow.style.marginTop = "8px";
                editedRow.style.fontSize = "12px";
                editedRow.style.opacity = "0.75";

                editedRow.innerHTML = `
                  <strong>Last edited:</strong> ${formattedDate} (${timeAgoText})
                  <strong>Last edited by:</strong> ${lastUser || "Unknown"}
                `;

                container.appendChild(editedRow);
              }

              layer.bindPopup(container);
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
            <FitBounds boundary={boundary} />
          </>
        )}
      </MapContainer>
    </div>
  );
}

export default Map;