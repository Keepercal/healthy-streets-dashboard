export default async function searchBoundaries(boundaryName) {
	const url =
		`https://nominatim.openstreetmap.org/search?` +
		new URLSearchParams({
			q: boundaryName,
			format: 'jsonv2',
			limit: 10,
		});

	const res = await fetch(url, {
		headers: {
			Accept: 'application/json',
			Referer: window.location.origin,
		},
	});

	if (!res.ok) {
		throw new Error(`Nominatim HTTP error: ${res.status}`);
	}

	const data = await res.json();

	const filtered = data.filter((item) => item.osm_type !== 'node');

	return filtered;
}
