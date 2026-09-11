/**
 * App Entry Point
 * -----------
 * npm run dev: Local development server
 * npm run deploy: Builds and deploys to GitHub Pages
 */

import { useMemo, useEffect, useState, useRef, useCallback } from 'react';
import './App.css';

/* High level components */
import AppLayout from './layout/AppLayout.jsx';

/* Popups */
import StatusPopup from '@/layout/Popups/StatusPopup/StatusPopup.jsx';

/* Modals */
import ModalManager from './layout/Modal/ModalManager.jsx';
import MODALS from './config/modalTypes.js';

/* Hooks */
import useWorkspaceActions from './hooks/useWorkspaceActions.js';
import useBoundaryManager from './hooks/useBoundaryManager.js';
import useLayerManager from './hooks/useLayerManager.js';
import useProjectManager from './hooks/useProjectManager.js';

import useFilteredLayers from './hooks/useFilteredLayers.js';

import useSession from './hooks/useSession.js';
import useUnsavedChanges from './hooks/useUnsavedChanges.js';

import useStatusPopup from './hooks/useStatusPopup.js';

/* Session & Database */
import { createSession } from './models/session.js';
import { getProject, getAllProjects, deleteProject } from './db/projectDB.js';

export default function App() {
	// ─────────────────────────────────────────
	// State
	// ─────────────────────────────────────────

	// Workspace
	const [isDirty, setIsDirty] = useState(false);
	const [basemap, setBasemap] = useState('carto');
	const [displayMode, setDisplayMode] = useState('default');

	// UI
	const [activeDrawer, setActiveDrawer] = useState(null);
	const [activeLayer, setActiveLayer] = useState(null);
	const [activeModal, setActiveModal] = useState(null);
	const [focusTrigger, setFocusTrigger] = useState(0);

	// Session
	const [sessionInfo, setSessionInfo] = useState(createSession());
	const [pendingSession, setPendingSession] = useState(null);
	const [pendingLayer, setPendingLayer] = useState(null);

	// Project
	const [projects, setProjects] = useState([]);

	// Startup
	const didRestore = useRef(false);

	// Screenshot
	const [takeScreenshot, setTakeScreenshot] = useState(null);

	const handleScreenshotReady = useCallback((fn) => {
		setTakeScreenshot(() => fn);
	}, []);

	// ─────────────────────────────────────────
	// Managers
	// ─────────────────────────────────────────

	/* Manages states for boundaries */
	const {
		// boundary data
		boundaries,
		previewBoundary,
		setPreviewBoundary,

		// boundary
		boundaryResults,
		fetchBoundaryResults,
		clearBoundaryResults,
		handlePreviewBoundary,

		// boundary handling
		setBoundary,
		removeBoundary,
		clearBoundaries,
		restoreBoundaries,

		// status
		status: boundaryStatus,
		error: boundaryError,
	} = useBoundaryManager({
		onChange: () => setIsDirty(true),
	});

	/* Manages states for data displayed on map */
	const {
		//state
		featureLayers,

		// data operations
		loadLayer,
		commitLayer,
		clearLayers,
		removeLayer,

		// layer editing
		toggleLayerVisibility,
		updateLayer,
		updateLayerFilters,

		// persistence
		exportLayers,
		restoreLayers,

		// cache
		getCachedFeatures,
		clearCache,

		// status
		failedFeatureKey,
		clearStatus,
		status: featureStatus,
		error: featureError,
	} = useLayerManager({
		onChange: () => setIsDirty(true),
	});

	const { statusPopup /*dismissPopup*/ } = useStatusPopup({
		boundaryStatus,
		boundaryError,

		featureStatus,
		featureError,
		failedFeatureKey,
	});

	// ─────────────────────────────────────────
	// Workspace
	// ─────────────────────────────────────────

	/*
	 * Restores a saved workspace, including the project, map settings, boundaries, and layers.
	 */
	async function restoreWorkspace(session) {
		if (!session) return;

		console.log('[DEBUG] Restoring workspace:', session);

		console.log(
			'[DEBUG] Session type:',
			session.projectId
				? `Project (${session.projectId})`
				: 'Temporary session'
		);

		setSessionInfo(session);

		// If the session matches the ID of a project
		if (session.projectId) {
			const project = await getProject(session.projectId);

			if (project) {
				setProject(project);
			}
		}

		const sessionData = session.data ?? {};
		setSessionInfo(session);

		// restore workspace settings
		setBasemap(sessionData.settings?.basemap ?? 'carto');
		setDisplayMode(sessionData.settings?.displayMode ?? 'default');

		// restore boundary
		restoreBoundaries(sessionData.boundaries);

		// restore layers
		restoreLayers(sessionData.layers ?? []);

		setIsDirty(false);
	}

	/*
	 * Creates a blank workspace
	 */
	const resetWorkspace = ({ preserveAutosave = false } = {}) => {
		console.log('[DEBUG] Resetting workspace');

		if (!preserveAutosave) {
			clearSavedSession(); // If resetting the session should keep the autosave for any reason
		}

		// clear states
		setProject(null);
		setSessionInfo(createSession());

		clearBoundaryResults();
		clearBoundaries();
		clearLayers();
		clearCache();

		setBasemap('carto');
		setDisplayMode('default');

		setActiveModal(null);
		setActiveDrawer(null);
		setIsDirty(false);
	};

	const handleNewWorkspace = () => {
		confirmUnsavedChanges(resetWorkspace);
	};

	// ─────────────────────────────────────────
	// Projects
	// ─────────────────────────────────────────

	const {
		project,
		setProject,

		openProject,
		saveCurrentProject,
		saveProjectAs,
	} = useProjectManager({
		workspace: {
			basemap,
			displayMode,

			boundaries,

			exportLayers,
		},

		session: {
			sessionInfo,
			setSessionInfo,
		},

		restore: {
			restoreWorkspace,
			restoreBoundaries,
			restoreLayers,
		},

		resetWorkspace: resetWorkspace,

		onDirtyChange: setIsDirty,
		onSaveAsRequested: () => setActiveModal(MODALS.SAVE_PROJECT),
	});

	/*
	 * Confirm unsaved changes and open project
	 */
	const handleOpenProject = (projectId) => {
		confirmUnsavedChanges(() => {
			openProject(projectId, restoreWorkspace);
			setActiveModal(null);
		});
	};

	/*
	 * Reset workspace when active project deleted
	 */
	async function handleDeleteProject(id) {
		await deleteProject(id);

		await loadProjects();

		if (project?.metadata.id !== id) return;

		console.log('[DEBUG] Deleted active project');

		resetWorkspace();
	}

	/*
	 * Creates a list of projects
	 */
	const loadProjects = useCallback(async () => {
		const list = await getAllProjects();

		const sorted = list.sort((a, b) => {
			return (
				new Date(b.metadata.modified) - new Date(a.metadata.modified)
			);
		});

		setProjects(sorted);
	}, []);

	// ─────────────────────────────────────────
	// Session
	// ─────────────────────────────────────────

	/*
	 *	Handles the management of the current working session
	 */
	const sessionManager = useSession({
		sessionInfo,

		basemap,
		displayMode,

		boundaries,

		layers: exportLayers(),

		onRestore: (session) => {
			setPendingSession(session);
			setActiveModal(MODALS.RESTORE_WORKSPACE);
		},
	});

	const { restoreSavedSession, clearSavedSession } = sessionManager;

	/*
	 * Restore session on refresh or open
	 */
	useEffect(() => {
		if (didRestore.current) return;

		didRestore.current = true;

		restoreSavedSession();
	}, [restoreSavedSession]);

	// ─────────────────────────────────────────
	// Derived state
	// ─────────────────────────────────────────

	//const hasBoundary = Object.keys(boundaryData ?? {}).length > 0; // Flag to check if boundary exists
	const hasBoundary = boundaries.length > 0;
	const hasFeatures = Object.keys(featureLayers).length > 0; // Flag to check if features exist
	const hasSavedProjects = Object.keys(projects).length > 0;
	const filteredLayers = useFilteredLayers(featureLayers);

	const boundaryName = boundaries.length
		? boundaries.map((boundary) => boundary.name).join(', ')
		: 'None';

	const projectName = project?.metadata.name ?? 'None';

	const selectedBoundaryIds = new Set(
		Array.from(boundaries, (boundary) => boundary.osm_id)
	);

	// ─────────────────────────────────────────
	// Managers
	// ─────────────────────────────────────────

	/*
	 * Hook for managing any unsaved changes changes within the session
	 */
	const {
		confirmUnsavedChanges,
		handleSaveAndContinue,
		handleDiscardAndContinue,
		handleCancel,
	} = useUnsavedChanges({
		isDirty,
		setActiveModal,
		modalKey: MODALS.UNSAVED_CHANGES,
		saveCurrentProject,
	});

	/*
	 * Hook for managing actions within the workspace
	 */
	const {
		handleSelectBoundary,
		handleRemoveBoundary,
		handleClearBoundaries,
		renameLayer,
		handleAddLayer,
	} = useWorkspaceActions({
		selectedBoundaryIds,

		setBoundary,
		handlePreviewBoundary,
		removeBoundary,
		clearBoundaries,

		clearLayers,
		updateLayer,
		loadLayer,
		commitLayer,

		setPendingLayer,
		setActiveModal,
		setIsDirty,
	});

	/* Remove the preview boundary if the user closes the active drawer */
	useEffect(() => {
		setPreviewBoundary(null);
	}, [setPreviewBoundary, activeDrawer]);

	return (
		<div className="App">
			{/* Popups */}
			<StatusPopup
				trigger={statusPopup.trigger}
				type={statusPopup.type}
				title={statusPopup.title}
				message={statusPopup.message}
				drawerOpen={activeDrawer !== null}
			/>

			<ModalManager
				activeModal={activeModal}
				setActiveModal={setActiveModal}
				pendingSession={pendingSession}
				setPendingSession={setPendingSession}
				pendingLayer={pendingLayer}
				setPendingLayer={setPendingLayer}
				isDirty={isDirty}
				setIsDirty={setIsDirty}
				boundaryies={boundaries}
				filteredLayers={filteredLayers}
				sessionManager={sessionManager}
				restoreWorkspace={restoreWorkspace}
				resetWorkspace={resetWorkspace}

				handleSaveAndContinue={handleSaveAndContinue}
				handleDiscardAndContinue={handleDiscardAndContinue}
				handleCancel={handleCancel}
				handleOpenProject={handleOpenProject}

				projects={projects}
				loadProjects={loadProjects}
				handleDeleteProject={handleDeleteProject}
				saveProjectAs={saveProjectAs}
				hasSavedProjects={hasSavedProjects}

				commitLayer={commitLayer}
				clearStatus={clearStatus}
			/>

			{/* Main UI */}
			<AppLayout
				// toolbar
				setActiveModal={setActiveModal}
				handleNewWorkspace={handleNewWorkspace}
				hasFeatures={hasFeatures}
				hasBoundary={hasBoundary}
				saveCurrentProject={saveCurrentProject}
				setFocusTrigger={setFocusTrigger}
				takeScreenshot={takeScreenshot}
				isDirty={isDirty}
				boundaryName={boundaryName}

				projectName={projectName}

				// sidebar
				featureLayers={featureLayers}
				activeDrawer={activeDrawer}
				setActiveDrawer={setActiveDrawer}

				// drawer
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
				basemap={basemap}
				setBasemap={setBasemap}
				displayMode={displayMode}
				setDisplayMode={setDisplayMode}
				clearBoundaryResults={clearBoundaryResults}
				handleRemoveBoundary={handleRemoveBoundary}
				handleClearBoundaries={handleClearBoundaries}
				removeLayer={removeLayer}
				clearLayers={clearLayers}
				getCachedFeatures={getCachedFeatures}

				// map
				filteredLayers={filteredLayers}
				focusTrigger={focusTrigger}
				handleScreenshotReady={handleScreenshotReady}

				boundaries={boundaries}
				previewBoundary={previewBoundary}
				handlePreviewBoundary={handlePreviewBoundary}
			/>
		</div>
	);
}
