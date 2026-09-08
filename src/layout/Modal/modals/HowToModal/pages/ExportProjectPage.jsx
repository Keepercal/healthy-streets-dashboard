import { helpImages } from '../config/helpImages';

export default function SaveOpenProjectPage() {
	return (
		<>
			<h2>Exporting data</h2>

			<p>
				Any data that you add to your workspace can be exported for use
				within other applications, making {__APP_NAME__} a great tool
				for filling in data gaps.
			</p>

			<p>
				To export the data within your workspace, click the
				<strong> Export</strong> button in the toolbar to bring up the
				export window. There are a few ways to configure what data in
				your workspace is exported.
			</p>

			<h3>All Layers</h3>

			<p>
				All the layers within your workspace will be exported,
				irresective of if they are hidden or not.
			</p>

			<h3>Visible Layers Only</h3>

			<p>
				Only visible layers on the map will be exported. This means any
				layers that you have hidden within the
				<strong> Manage Layers</strong> drawer will not be exported.
			</p>

			<h3>Select Layers</h3>

			<p>
				You can choose which layers get exported. Note this will also
				export hidden layers if you choose them.
			</p>

			<img
				src={helpImages.exportProject}
				alt={`A screenshot of the ${__APP_NAME__} interface showing the export window.`}
			/>

			<p>
				Once you have set your export configuration, you can export in
				three formats, <strong>GeoJSON</strong>, <strong>KML</strong>{' '}
				and <strong>GPX</strong>.
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

			<p>
				<strong>NOTE:</strong> Any filters you have added to your layers
				will impact what data gets exported.
			</p>
		</>
	);
}
