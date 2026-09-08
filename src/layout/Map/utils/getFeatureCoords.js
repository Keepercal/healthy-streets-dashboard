/**
 * getFeatureCoords
 * -----------------
 * Calculates the coordinates of a given OSM feature
 */
export default function getFeatureCentre(feature) {
	const geom = feature.geometry;

	if (!geom) {
		console.error('Missing geometry', geom);
		return;
	}

	let lon, lat;

	/* Calculate centre of feature */
	switch (geom.type) {
		case 'Point':
			[lon, lat] = geom.coordinates;
			break;

		case 'LineString': {
			const coords = geom.coordinates;
			const lons = coords.map((p) => p[0]);
			const lats = coords.map((p) => p[1]);

			lon = (Math.min(...lons) + Math.max(...lons)) / 2;
			lat = (Math.min(...lats) + Math.max(...lats)) / 2;
			break;
		}

		case 'MultiLineString': {
			const coords = geom.coordinates;
			const lons = coords.map((p) => p[0]);
			const lats = coords.map((p) => p[1]);

			lon = (Math.min(...lons) + Math.max(...lons)) / 2;
			lat = (Math.min(...lats) + Math.max(...lats)) / 2;
			break;
		}

		case 'Polygon': {
			const ring = geom.coordinates[0];
			const lons = ring.map((p) => p[0]);
			const lats = ring.map((p) => p[1]);

			lon = (Math.min(...lons) + Math.max(...lons)) / 2;
			lat = (Math.min(...lats) + Math.max(...lats)) / 2;
			break;
		}

		case 'MultiPolygon': {
			const ring = geom.coordinates[0][0];
			const lons = ring.map((p) => p[0]);
			const lats = ring.map((p) => p[1]);

			lon = (Math.min(...lons) + Math.max(...lons)) / 2;
			lat = (Math.min(...lats) + Math.max(...lats)) / 2;
			break;
		}

		default:
			console.error('Unknown geometry format', geom.type);
			return;
	}

	return { lat, lon };
}
