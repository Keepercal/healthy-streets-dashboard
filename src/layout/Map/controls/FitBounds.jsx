import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

/**
 * FitBounds
 * ---------
 * Automatically adjusts the map view to fit a GeoJSON boundary.
 *
 * Triggers whenever `boundary` changes.
 */
export default function FitBounds({ boundary, trigger }) {
	const map = useMap();

	useEffect(() => {
		if (!boundary) return;

		// Create bounds directly from GeoJSON without rendering a layer
		const bounds = L.geoJSON(boundary).getBounds();

		if (bounds.isValid()) {
			map.fitBounds(bounds, {
				padding: [20, 20],
				maxZoom: 16,
			});
		}
	}, [boundary, trigger, map]);

	return null;
}
