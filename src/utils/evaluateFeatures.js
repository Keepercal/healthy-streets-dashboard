/**
 * evaluateFeature
 * ---------------
 * Evaluates whether a GeoJSON feature matches all provided filter rules.
 *
 * Each filter is applied using AND logic.
 * Returns true only if all filters pass.
 */
export default function evaluateFeature(feature, filters) {
	const tags = feature?.properties ?? {};

	if (!filters.length) {
		return true;
	}

	return filters.reduce((result, filter, index) => {
		const value = tags[filter.key];

		const normalisedValue = String(value ?? '');

		let matches;

		switch (filter.operator) {
			case 'equals':
				matches = normalisedValue === filter.value;
				break;

			case 'not_equals':
				matches = normalisedValue !== filter.value;
				break;

			case 'exists':
				matches = value !== undefined;
				break;

			case 'missing':
				matches = value === undefined;
				break;

			default:
				// Unknown operators are treated as non-blocking
				matches = true;
		}

		// First filter establishes the starting value
		if (index === 0) {
			return matches;
		}

		//Combine with previous result
		if (filter.join === 'OR') {
			return result || matches;
		}

		// Default behaviour = AND
		return result && matches;
	}, true);
}
