// models/project.js

export function createProject(overrides = {}) {
	const now = new Date().toISOString();

	return {
		version: 1,

		metadata: {
			id: crypto.randomUUID(),
			name: 'Untitled Project',
			description: '',
			created: now,
			modified: now,
			...overrides.metadata,
		},

		settings: {
			basemap: 'carto',
			displayMode: 'default',
			...overrides.settings,
		},

		boundary: {
			selectedBoundaryKey: 'none',
			data: null,
			geojson: null,
			...overrides.boundary,
		},

		layers: overrides.layers ?? [],
	};
}
