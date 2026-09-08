const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

/**
 * callOverpass
 * ------------
 * Executes a raw Overpass API query and returns the HTTP response.
 *
 * Handles only transport-level concerns (fetch + status logging).
 */
async function callOverpass(query) {
	console.log('[DEBUG] callOverpass ENTER with query:', query);
	const url = `${OVERPASS_URL}?data=${encodeURIComponent(query)}`;

	const res = await fetch(url);

	return res;
}

/**
 * handleOverpassResponse
 * ----------------------
 * Centralised response handler for Overpass API calls.
 *
 * - Handles retries for 504 gateway timeouts
 * - Throws consistent errors for HTTP failures
 * - Validates payload shape
 */
async function handleOverpassResponse(res, retryFn, retries) {
	if (res.status === 504) {
		if (retries <= 0) {
			throw new Error('Overpass timed out after multiple retries');
		}

		await new Promise((resolve) => setTimeout(resolve, 1000));

		return retryFn();
	}

	if (!res.ok) {
		if (res.status === 429) {
			throw new Error(
				`HTTP ${res.status}: Too Many Requests - wait before retrying`
			);
		}

		throw new Error(`HTTP ${res.status} (${res.statusText})`);
	}

	const data = await res.json();

	if (!data?.elements?.length) {
		throw new Error('Overpass returned an empty result');
	}

	console.log('[DEBUG] Overpass API returned a result', data);

	return data;
}

/**
 * fetchOSMBoundary
 * -------------
 * Fetches a boundary relation from Overpass by name.
 */
export async function fetchOSMBoundary(boundaryID, boundaryType, retries = 3) {
	if (!boundaryID || boundaryID === 'none') return null;

	console.log('[DEBUG] fetchOSMBoundary ENTER:', {
		boundaryID,
		boundaryType,
	});

	let query;

	query = `
        [out:json][timeout:60];
        relation(${boundaryID});
        out geom meta;
    `;

	const res = await callOverpass(query);

	return handleOverpassResponse(
		res,
		() => fetchOSMBoundary(boundaryID, boundaryType, retries - 1),
		retries
	);
}

/**
 * fetchOSMFeature
 * ---------------
 * Fetches OSM features inside a boundary area using tag filters.
 */
export async function fetchOSMFeature(
	boundaryID,
	featureTag,
	featureValue,
	featureType
) {
	if (!boundaryID || boundaryID === 'none') return null;

	console.log('[DEBUG] ENTER fetchFeatures:', {
		boundaryID,
		featureTag,
		featureValue,
		featureType,
	});

	const query = `
		[out:json][timeout:60];

		relation(${boundaryID})->.rels;
		.rels map_to_area -> .area;

		nwr(area.area)["${featureTag}"="${featureValue}"]->.features;

		(
			.features;
			node(r.features);
		);

		out tags geom meta;
	`;

	const res = await callOverpass(query);

	console.log(res);

	return handleOverpassResponse(res, () =>
		fetchOSMFeature(boundaryID, featureTag, featureValue, featureType)
	);
}
