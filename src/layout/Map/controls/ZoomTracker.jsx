import { useMapEvent } from 'react-leaflet';

/**
 * ZoomTracker
 * -----------
 * Listens to Leaflet zoom events and reports zoom level
 * back to parent state via `onZoom`.
 */
export default function ZoomTracker({ onZoom }) {
	useMapEvent('zoomend', (e) => {
		if (!onZoom) return;

		onZoom(e.target.getZoom());
	});

	return null;
}
