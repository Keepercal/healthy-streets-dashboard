import './Drawer.css';

import BoundaryPanel from './panels/BoundaryPanel/BoundaryPanel';
import AddLayersPanel from './panels/AddLayersPanel/AddLayersPanel';
import ManageLayersPanel from './panels/ManageLayersPanel/ManageLayersPanel';
import DisplayPanel from './panels/DisplayPanel/DisplayPanel';

function Drawer({
	hasBoundary,
	activeDrawer,
	setActiveDrawer,

	featureLayers,
	handleAddLayer,
	updateLayer,
	toggleLayerVisibility,
	renameLayer,

	updateLayerFilters,

	selectedBoundaryKey,
	loadBoundaryResults,
	handleSelectBoundary,
	boundaryResults,

	featureOptions,

	basemap,
	setBasemap,
	displayMode,
	setDisplayMode,

	clearBoundaryResults,
	handleClearBoundary,
	removeLayer,
	clearLayers,
	cachedFeatures,
}) {
	const DRAWER_TITLES = {
		boundary: 'Search for Boundary',
		addLayers: 'Add Layers',
		manageLayers: 'Manage Layers',
		display: 'Display',
	};

	return (
		<div className={`drawer ${activeDrawer ? 'open' : ''}`}>
			<div className="drawer-header">
				<h2>{DRAWER_TITLES[activeDrawer]}</h2>

				<button
					className="drawer-close"
					onClick={() => setActiveDrawer(null)}
					aria-label="Close drawer"
				>
					×
				</button>
			</div>

			<div className="drawer-content">
				{activeDrawer === 'boundary' && (
					<BoundaryPanel
						hasBoundary={hasBoundary}
						loadBoundaryResults={loadBoundaryResults}
						clearBoundaryResults={clearBoundaryResults}
						handleClearBoundary={handleClearBoundary}
						clearLayers={clearLayers}

						boundaryResults={boundaryResults}
						selectedBoundaryKey={selectedBoundaryKey}
						onSelectBoundary={handleSelectBoundary}
					/>
				)}

				{activeDrawer === 'addLayers' && (
					<AddLayersPanel
						featureOptions={featureOptions}
						handleAddLayer={handleAddLayer}
						cachedFeatures={cachedFeatures}
					/>
				)}

				{activeDrawer === 'manageLayers' && (
					<ManageLayersPanel
						featureLayers={featureLayers}
						toggleLayerVisibility={toggleLayerVisibility}
						updateLayer={updateLayer}

						updateLayerFilters={updateLayerFilters}

						removeLayer={removeLayer}
						renameLayer={renameLayer}
						clearLayers={clearLayers}
					/>
				)}

				{activeDrawer === 'display' && (
					<DisplayPanel
						basemap={basemap}
						setBasemap={setBasemap}
						displayMode={displayMode}
						setDisplayMode={setDisplayMode}
					/>
				)}
			</div>
		</div>
	);
}

export default Drawer;
