import { GeoJSON } from 'react-leaflet';

/**
 * BoundaryLayer
 * --------------
 * Renders a GeoJSON boundary overlay on the map.
 * Styled as a subtle red outline with low fill opacity.
 */
export default function BoundaryLayer({ boundary }) {
	const style = {
		color: 'red',
		dashArray: '5, 5',
		weight: 2,
		opacity: 0.55,
		fillOpacity: 0.02,
		interactive: false,
	};

	return <GeoJSON data={boundary} style={style} pointToLayer={() => null} />;
}
