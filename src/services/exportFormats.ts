import tokml from 'tokml';
import GeoJsonToGpx from '@dwayneparton/geojson-to-gpx';

export type ExportFormat = 'geojson' | 'kml' | 'gpx';

export type ExportScope = 'all' | 'visible' | 'filtered' | 'selected';

/**
 * Convert GeoJSON into another format
 *
 * Supports:
 * - GeoJSON
 * - KML
 * - GPX
 */
export function convertGeoJSON(geojson: object, format: ExportFormat): string {
	if (!geojson) {
		throw new Error('No GeoJSON data provided');
	}

	switch (format) {
		// Return formatted GeoJSON
		case 'geojson':
			return JSON.stringify(geojson, null, 2);

		// Convert GeoJSON to KML
		case 'kml':
			return tokml(geojson);

		// Convert GeoJSON to GPX
		case 'gpx':
			return new XMLSerializer().serializeToString(GeoJsonToGpx(geojson));

		default:
			throw new Error(`Unsupported export format: ${format}`);
	}
}
