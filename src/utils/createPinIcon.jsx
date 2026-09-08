import L from 'leaflet';
import { MapPin } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';

/* Render pin icon */
export default function createPinIcon(color) {
	const svg = renderToStaticMarkup(
		<MapPin
			size={26}
			color={color}
			fill={color}
			stroke="white"
			strokeWidth={1.5}
		/>
	);

	return L.divIcon({
		html: svg,
		className: 'leaflet-lucide-icon',
		iconSize: [26, 26],
		iconAnchor: [13, 26],
		popupAnchor: [0, -26],
	});
}
