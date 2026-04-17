import { useEffect} from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap, Marker, Popup } from 'react-leaflet';
import L from "leaflet";

export default function FitBounds({ boundary }) {
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