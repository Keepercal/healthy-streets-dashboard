//import { aboutImages } from '../config/aboutImages';

export default function FileFormatPage() {
	return (
		<>
			<h2>Export File Formats</h2>
			<p>
				You can export your project in three file formats,{' '}
				<strong>GeoJSON</strong>, <strong>KML</strong> and{' '}
				<strong>GPX</strong>.
			</p>

			<dl className="list">
				<dt>GeoJSON</dt>
				<dd>
					<strong>Best for:</strong> GIS and web mapping software
					<br />
					<strong>Examples:</strong> QGIS, Leaflet, Mapbox
				</dd>

				<dt>KML</dt>
				<dd>
					<strong>Best for:</strong> Google mapping applications
					<br />
					<strong>Examples:</strong> Google Earth, Google Maps
				</dd>

				<dt>GPX</dt>
				<dd>
					<strong>Best for:</strong> GPS devices and route tracking
					<br />
					<strong>Examples:</strong> Garmin, Strava, hiking and
					cycling apps
				</dd>
			</dl>
		</>
	);
}
