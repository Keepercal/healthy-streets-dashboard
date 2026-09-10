import './Drawer.css';

import AddBoundaryPanel from './panels/AddBoundaryPanel/AddBoundaryPanel';
import ManageBoundaryPanel from './panels/ManageBoundaryPanel/ManageBoundaryPanel';
import AddLayerPanel from './panels/AddLayerPanel/AddLayerPanel';
import ManageLayerPanel from './panels/ManageLayerPanel/ManageLayerPanel';
import DisplayPanel from './panels/DisplayPanel/DisplayPanel';

function Drawer({
	boundaries,
	hasBoundary,

	activeDrawer,
	setActiveDrawer,

	featureLayers,
	handleAddLayer,
	updateLayer,
	toggleLayerVisibility,
	renameLayer,

	updateLayerFilters,

	selectedBoundaryIds,
	fetchBoundaryResults,
	handleSelectBoundary,
	boundaryResults,

	featureOptions,

	basemap,
	setBasemap,
	displayMode,
	setDisplayMode,

	clearBoundaryResults,
	handlePreviewBoundary,
	handleRemoveBoundary,
	handleClearBoundaries,
	removeLayer,
	clearLayers,
	cachedFeatures,
}) {
	const DRAWER_TITLES = {
		addBoundary: 'Search for Boundary',
		manageBoundary: 'Manage Active Boundaries',
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
				{activeDrawer === 'addBoundary' && (
					<AddBoundaryPanel
						hasBoundary={hasBoundary}
						fetchBoundaryResults={fetchBoundaryResults}
						clearBoundaryResults={clearBoundaryResults}
						handleClearBoundaries={handleClearBoundaries}
						clearLayers={clearLayers}

						boundaryResults={boundaryResults}
						selectedBoundaryIds={selectedBoundaryIds}
						handleSelectBoundary={handleSelectBoundary}
						handlePreviewBoundary={handlePreviewBoundary}
					/>
				)}

				{activeDrawer === 'manageBoundary' && (
					<ManageBoundaryPanel
						boundaries={boundaries}
						hasBoundary={hasBoundary}
						handleRemoveBoundary={handleRemoveBoundary}
						handleClearBoundaries={handleClearBoundaries}
						handlePreviewBoundary={handlePreviewBoundary}
					/>
				)}

				{activeDrawer === 'addLayers' && (
					<AddLayerPanel
						featureOptions={featureOptions}
						handleAddLayer={handleAddLayer}
						cachedFeatures={cachedFeatures}
					/>
				)}

				{activeDrawer === 'manageLayers' && (
					<ManageLayerPanel
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
