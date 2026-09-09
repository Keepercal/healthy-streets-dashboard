import { useState, useRef, useEffect } from 'react';
//import osmtogeojson from 'osmtogeojson';

//import { fetchOSMBoundary } from '../services/overpass/overpass';
import searchBoundaries from '../services/nominatim/searchBoundaries';

/**
 * useBoundaryManager
 * -----------
 * Fetches and manages OSM boundary data and its GeoJSON conversion.
 *
 * Handles:
 * - search Nominatim for list of boundaies, clear boundaries
 * - loading boundary using a service from the Overpass API
 * - clearing boundaries
 * - resetting state
 * - exporting and restoring boundaries
 */
export default function useBoundaryManager({ onChange = () => {} } = {}) {
	const [boundaryResults, setBoundaryResults] = useState([]);

	const [boundaries, setBoundaries] = useState([]);

	const [status, setStatus] = useState('idle');
	const [error, setError] = useState(null);

	const requestId = useRef(0);

	function markDirty() {
		onChange?.();
	}

	useEffect(() => {
		console.log('[DEBUG] boundaries changed:', boundaries);
	}, [boundaries]);

	/* Find a list of boundaries from Nominatim from a given boundary name */
	const loadBoundaryResults = async (boundaryName) => {
		setBoundaryResults(null);

		console.log('[DEBUG] loadBoundaryResults ENTER:', { boundaryName });

		const currentId = ++requestId.current;

		if (boundaryName === 'none') {
			return;
		}

		try {
			const result = await searchBoundaries(boundaryName);

			if (currentId !== requestId.current) return;

			setBoundaryResults(result);

			console.log('[DEBUG] Nominatim API returned result(s):', result);
		} catch (err) {
			if (currentId !== requestId.current) return;
			setBoundaryResults([]);
			console.error(err);
		}
	};

	/* Clear array of boundary results */
	const clearBoundaryResults = () => {
		setBoundaryResults([]);
	};

	/*
	 * THIS COMMENTED SECTION OF CODE RETURNS A BOUNDARY RELATION FROM THE OVERPASS API.
	 */

	/* Load boundary by fetching from Overpass API */
	/*const loadBoundary = async (boundaryIDs, boundaryType, boundaryName) => {
		clearBoundary();

		console.log('[DEBUG] setBoundary ENTER:', {
			boundaryIDs,
			boundaryType,
			boundaryName,
		});

		const currentId = ++requestId.current;

		if (boundaryIDs === 'none') {
			console.error('[DEBUG] BoundaryID is empty:', boundaryIDs);
			return;
		}

		setStatus('loading');

		try {
			const result = await fetchOSMBoundary(
				// Fetch boundary from Overpass API
				boundaryIDs,
				boundaryType
			);

			if (currentId !== requestId.current) return;

			const geojson = osmtogeojson(result, { meta: true }); // Convert results to geoJSON

			setBoundaryData(result);
			setBoundaryGeojson(geojson);

			setStatus('success');
		} catch (err) {
			if (currentId !== requestId.current) return;

			console.error(err);

			setBoundaryData(null);
			setBoundaryGeojson(null);

			setStatus('error');
			setError(err);
		}
	};*/

	const setBoundary = (boundary) => {
		if (boundary.osm_id === 'none') {
			return;
		}

		setBoundaries((prev) => {
			if (prev.some((item) => item.osm_id === boundary.osm_id)) {
				return prev;
			}

			return [...prev, boundary];
		});

		setStatus('success');
	};

	/* Clear the current boundary  from state */
	const clearBoundary = () => {
		setBoundaries([]);

		setStatus('idle');
		setError(null);
		markDirty(false);
	};

	/* Export the boundary data as an object */
	function exportBoundary() {
		return {
			boundaries,
		};
	}

	/* Restore a given boundary to state */
	function restoreBoundary(boundary) {
		requestId.current++;

		if (!boundary) {
			clearBoundary();
			return;
		}

		setBoundaries(boundary.boundaries ?? []);

		setStatus('success');
		setError(null);
	}

	return {
		// boundary results
		boundaryResults,
		loadBoundaryResults,
		clearBoundaryResults,

		// boundary data
		boundaries,

		// boundary handling
		setBoundary,
		clearBoundary,
		restoreBoundary,
		exportBoundary,

		// status
		status,
		error,
	};
}
