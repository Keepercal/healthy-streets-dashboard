import { GeoJSON } from 'react-leaflet';

/**
 * BoundaryLayer
 * --------------
 * Renders boundary GeoJSON overlays on the map.
 */
export default function BoundaryLayer({ boundaries }) {
	const style = {
		color: 'red',
		dashArray: '5, 5',
		weight: 2,
		opacity: 0.55,
		fillOpacity: 0.02,
		interactive: false,
	};

	return (
		<>
			{boundaries.map((boundary) => (
				<GeoJSON
					key={boundary.osm_id}
					data={boundary.geojson}
					style={style}
					pointToLayer={() => null}
				/>
			))}
		</>
	);
}
