import { useState } from 'react';

import Map from './Map/Map.jsx';
import Toolbar from './Toolbar/Toolbar';
import Sidebar from './Sidebar/Sidebar';
import Drawer from './Drawer/Drawer';
import MapFooter from './MapFooter/MapFooter.jsx';

import Legend from '@/components/Legend/Legend.jsx';

import { FEATURE_OPTIONS } from '@/config/featureOptions.js';

export default function AppLayout({
	// toolbar
	setActiveModal,
	handleNewWorkspace,
	hasFeatures,
	hasBoundary,
	saveCurrentProject,
	setFocusTrigger,
	takeScreenshot,
	isDirty,
	boundaryName,

	// sidebar
	featureLayers,
	activeDrawer,
	setActiveDrawer,

	// drawer
	activeLayer,
	setActiveLayer,
	handleAddLayer,
	updateLayer,
	toggleLayerVisibility,
	renameLayer,
	updateLayerFilters,
	selectedBoundaryIds,
	fetchBoundaryResults,
	handleSelectBoundary,
	boundaryResults,
	basemap,
	setBasemap,
	displayMode,
	setDisplayMode,
	clearBoundaryResults,
	handleRemoveBoundary,
	handleClearBoundaries,
	removeLayer,
	clearLayers,
	getCachedFeatures,

	// map
	boundaries,
	previewBoundary,
	filteredLayers,
	focusTrigger,
	handleScreenshotReady,
	handlePreviewBoundary,

	projectName,
}) {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

	return (
		<div className="app-layout">
			<header className="app-header">
				<Toolbar
					onOpenModal={setActiveModal}
					onNewWorkspace={handleNewWorkspace}
					canExport={hasFeatures}
					canSave={hasBoundary}
					onSave={saveCurrentProject}
					onFocus={() => setFocusTrigger((t) => t + 1)}
					onScreenshot={() => takeScreenshot?.()}
					isDirty={isDirty}
					boundaryName={boundaryName}
				/>
			</header>

			<div
				className={`app-body ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}
			>
				<Sidebar
					hasBoundary={hasBoundary}
					featureLayers={featureLayers}

					activeDrawer={activeDrawer}
					setActiveDrawer={setActiveDrawer}

					collapsed={sidebarCollapsed}
					setCollapsed={setSidebarCollapsed}
				/>

				<Drawer
					boundaries={boundaries}
					hasBoundary={hasBoundary}

					activeDrawer={activeDrawer}
					setActiveDrawer={setActiveDrawer}

					featureLayers={featureLayers}
					activeLayer={activeLayer}
					setActiveLayer={setActiveLayer}
					handleAddLayer={handleAddLayer}

					updateLayer={updateLayer}
					toggleLayerVisibility={toggleLayerVisibility}
					renameLayer={renameLayer}

					updateLayerFilters={updateLayerFilters}

					selectedBoundaryIds={selectedBoundaryIds}

					fetchBoundaryResults={fetchBoundaryResults}
					handleSelectBoundary={handleSelectBoundary}
					boundaryResults={boundaryResults}

					featureOptions={FEATURE_OPTIONS}

					basemap={basemap}
					setBasemap={setBasemap}
					displayMode={displayMode}
					setDisplayMode={setDisplayMode}

					clearBoundaryResults={clearBoundaryResults}
					handlePreviewBoundary={handlePreviewBoundary}
					handleRemoveBoundary={handleRemoveBoundary}
					handleClearBoundaries={handleClearBoundaries}
					removeLayer={removeLayer}
					clearLayers={clearLayers}
					cachedFeatures={getCachedFeatures(selectedBoundaryIds)}
				/>

				<div className="main-content">
					<div className="map-container">
						{hasFeatures && displayMode === 'lastEdited' && (
							<Legend />
						)}

						<Map
							// boundary
							boundaries={boundaries}
							previewBoundary={previewBoundary}
							boundaryIDs={selectedBoundaryIds}

							// features
							featureLayers={filteredLayers}

							// display settings
							displayMode={displayMode}
							basemap={basemap}
							focusTrigger={focusTrigger}
							onScreenshot={handleScreenshotReady}
						/>
					</div>

					<div className="map-ribbon">
						<MapFooter
							features={featureLayers}
							projectName={projectName}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
