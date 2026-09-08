import L from 'leaflet';
import area from '@turf/area';

export default function createOverviewFeatures(features, zoom) {
	// Decide how large a polygon can be before it stays as a polygon
	const maxArea =
		zoom < 12
			? 50000 // Very zoomed out: only large polygons become dots
			: zoom < 15
				? 5000 // Medium zoom
				: 500; // Close zoom: only very small polygons become dots

	return {
		type: 'FeatureCollection',

		features: features.features
			.filter((feature) => {
				// Hide filtered features
				if (feature._matchesFilters === false) {
					return false;
				}

				if (
					feature.geometry?.type === 'Point' ||
					feature.geometry?.type === 'LineString' ||
					feature.geometry?.type === 'MultiLineString'
				) {
					return false;
				}

				const size = area(feature);

				return size < maxArea;
			})

			.map((feature) => {
				const bounds = L.geoJSON(feature).getBounds();
				const centre = bounds.getCenter();

				return {
					...feature,
					_matchesFilters: feature._matchesFilters,
					geometry: {
						type: 'Point',
						coordinates: [centre.lng, centre.lat],
					},
				};
			}),
	};
}
