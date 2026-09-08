/**
 * getFeatureCoords
 * -----------------
 * Generates a name for the feature based off the feature's metadata
 */
export default function getFeatureName(feature) {
	const props = feature.properties || {};

	/* OSM ID parsing */
	const [featureType, osmID] = (feature.id || '').split('/');

	const featureName =
		props.name ??
		props.brand ??
		props.operator ??
		props.amenity ??
		props.shop ??
		props.highway ??
		`${featureType} ${osmID}`;

	return featureName;
}
