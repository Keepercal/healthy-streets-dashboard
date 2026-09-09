// models/session.js

export function createSession(overrides = {}) {
	const now = new Date().toISOString();

	return {
		id: crypto.randomUUID(),

		// null means this is just a scratch session
		projectId: null,

		created: now,
		modified: now,

		data: {
			settings: {
				basemap: 'carto',
				displayMode: 'default',
			},

			boundary: {
				selectedBoundaryIds: 'none',
				data: null,
				geojson: null,
			},

			layers: [],
		},

		...overrides,
	};
}
