// Creates a new feature point to be placed on the map
// Feature position is derived from Overpass feature's metadata

import { GeoJSON } from 'react-leaflet';
import React from 'react';

import bindFeaturePopup from '../utils/bindFeaturePopup.jsx';
import { createFeatureMarker, stylePolygon } from '../utils/featureRendering';

import createOverviewFeatures from '../utils/createOverviewFeatures.js';

// Fields not displayed in the popup
const EXCLUDE_KEYS = new Set([
	'type',
	'id',
	'timestamp',
	'version',
	'changeset',
	'user',
	'uid',
]);

/**
 * Forces Leaflet to refresh polygon styles
 */
function StyledGeoJSON({ data, styleFunction, ...props }) {
	const geoJsonRef = React.useRef();

	React.useEffect(() => {
		if (!geoJsonRef.current) return;

		geoJsonRef.current.eachLayer((layer) => {
			if (layer.feature) {
				layer.setStyle(styleFunction(layer.feature));
			}
		});
	}, [data, styleFunction]);

	return (
		<GeoJSON
			ref={geoJsonRef}
			data={data}
			style={styleFunction}
			{...props}
		/>
	);
}

/**
 * FeatureLayer
 * ------------
 * Renders Overpass features on the map.
 *
 * Features:
 * - Displays polygons and points
 * - Converts small polygons to overview dots
 * - Updates styling when filters change
 * - Binds popup content
 */
export default function FeatureLayer({ featureLayers, zoom, displayMode }) {
	if (!featureLayers || Object.keys(featureLayers).length === 0) {
		return null;
	}

	return (
		<>
			{Object.entries(featureLayers)

				.filter(([_, layer]) => layer.visible)

				.map(([featureKey, layer]) => {
					const features = layer.geojson;

					if (!features?.features) {
						return null;
					}

					/*
					 * Create a new GeoJSON reference.
					 * This forces React Leaflet to notice filter changes.
					 */
					const filteredFeatures = {
						...features,

						features: features.features.map((feature) => ({
							...feature,
							_matchesFilters: feature._matchesFilters,
						})),
					};

					/*
					 * Used to rebuild layers when filters change
					 */
					const filterKey = features.features
						.map(
							(feature) =>
								`${feature.id}-${feature._matchesFilters}`
						)
						.join('|');

					/*
					 * Create overview dots only for
					 * matching small polygons
					 */
					const overviewFeatures = createOverviewFeatures(
						{
							...filteredFeatures,

							features: filteredFeatures.features.filter(
								(feature) => feature._matchesFilters !== false
							),
						},
						zoom
					);

					const handleEachFeature = (feature, layer) => {
						bindFeaturePopup(feature, layer, EXCLUDE_KEYS);
					};

					return (
						<React.Fragment
							key={`${featureKey}-${filterKey}-${zoom < 15}`}
						>
							{/* Main features */}
							<StyledGeoJSON
								data={filteredFeatures}
								key={`${featureKey}-${filterKey}-${displayMode}-${layer.colour}`}
								styleFunction={(feature) =>
									stylePolygon(
										feature,
										displayMode,
										layer.colour
									)
								}
								pointToLayer={(feature, latlng) =>
									createFeatureMarker(
										feature,
										latlng,
										displayMode,
										layer.colour
									)
								}
								onEachFeature={handleEachFeature}
							/>

							{/* Overview dots */}
							{zoom < 15 && (
								<GeoJSON
									data={overviewFeatures}
									key={`${featureKey}-overview-${filterKey}-${displayMode}-${layer.colour}`}
									pointToLayer={(feature, latlng) =>
										createFeatureMarker(
											feature,
											latlng,
											displayMode,
											layer.colour,
											true
										)
									}
									onEachFeature={handleEachFeature}
								/>
							)}
						</React.Fragment>
					);
				})}
		</>
	);
}
