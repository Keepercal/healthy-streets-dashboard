/**
 * countFeature
 * ---------------
 * Counts the number of features returned from the Overpass API by type
 */
export default function countFeatures(payload) {
	let nodeCount = 0;
	let wayCount = 0;
	let relationCount = 0;

	let totalCount = 0;

	Object.values(payload || {}).forEach((layer) => {
		layer.data?.elements?.forEach((feature) => {
			switch (feature.type) {
				case 'node':
					nodeCount++;
					break;

				case 'way':
					wayCount++;
					break;

				case 'relation':
					relationCount++;
					break;

				default:
					break;
			}

			totalCount++;
		});
	});

	return { totalCount, nodeCount, wayCount, relationCount };
}
