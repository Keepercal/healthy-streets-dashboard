const BASEMAPS = {
	carto: {
		name: 'CARTO',
		url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
		attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
	},
	carto_grey: {
		name: 'CARTO Grey',
		url: 'https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png',
		attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
	},
	carto_dark: {
		name: 'CARTO Dark',
		url: 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png',
		attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
	},
	openstreetmap: {
		name: 'OpenStreetMap',
		url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	},
	satellite: {
		name: 'Satellite',
		url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
		attribution: '&copy; Esri',
	},
};

export default BASEMAPS;
