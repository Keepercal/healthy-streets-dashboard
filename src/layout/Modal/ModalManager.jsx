import ExportModal from '@/layout/Modal/modals/ExportModal/ExportModal.jsx';
import OpenProjectModal from '@/layout/Modal/modals/OpenProjectModal/OpenProjectModal.jsx';
import HowToModal from '@/layout/Modal/modals/HowToModal/HowToModal.jsx';
import AboutModal from '@/layout/Modal/modals/AboutModal/AboutModal.jsx';

import UnsavedChangesModal from '@/layout/Modal/modals/UnsavedChangesModal.jsx';
import SaveModal from '@/layout/Modal/modals/SaveModal.jsx';
import LargeDatasetModal from '@/layout/Modal/modals/LargeDatasetModal.jsx';
import RestoreSessionModal from '@/layout/Modal/modals/RestoreSessionModal.jsx';

import MODALS from '@/config/modalTypes.js';

/**
 * ModalManager
 * ------------
 * Centralised management for modals
 */
export default function ModalManager({
	activeModal,
	setActiveModal,

	pendingSession,
	setPendingSession,

	pendingLayer,
	setPendingLayer,

	isDirty,
	setIsDirty,

	boundaryGeojson,
	filteredLayers,

	sessionManager,
	restoreSession,
	resetWorkspace,

	handleSaveAndContinue,
	handleDiscardAndContinue,
	handleCancel,

	handleOpenProject,

	projects,
	loadProjects,
	handleDeleteProject,
	saveProjectAs,
	hasSavedProjects,

	commitLayer,
	clearStatus,
}) {
	return (
		<>
			{activeModal === MODALS.RESTORE_SESSION && (
				<RestoreSessionModal
					onRestore={() => {
						if (!pendingSession) return;

						restoreSession(pendingSession);

						setPendingSession(null);
						setActiveModal(null);
					}}
					onStartNew={() => {
						sessionManager.clearSavedSession();

						setPendingSession(null);
						setActiveModal(null);

						resetWorkspace();
					}}
					onClose={() => {
						setPendingSession(null);
						setActiveModal(null);
					}}
				/>
			)}

			{activeModal === MODALS.UNSAVED_CHANGES && (
				<UnsavedChangesModal
					onSave={handleSaveAndContinue}
					onDiscard={handleDiscardAndContinue}
					onClose={handleCancel}
					canClose={false}
				/>
			)}

			{activeModal === MODALS.OPEN_PROJECT && (
				<OpenProjectModal
					isDirty={isDirty}
					onOpen={handleOpenProject}
					onClose={() => setActiveModal(null)}
					handleDeleteProject={handleDeleteProject}
					projects={projects}
					loadProjects={loadProjects}
					saveProjectAs={saveProjectAs}
					hasSavedProjects={hasSavedProjects}
				/>
			)}

			{activeModal === MODALS.SAVE_PROJECT && (
				<SaveModal
					onSaveAs={(name, description) => {
						saveProjectAs(name, description);
						setActiveModal(null);
					}}
					onClose={() => setActiveModal(null)}
				/>
			)}

			{activeModal === MODALS.EXPORT && (
				<ExportModal
					boundaryGeojson={boundaryGeojson}
					featureLayers={filteredLayers}
					onClose={() => setActiveModal(null)}
				/>
			)}

			{activeModal === MODALS.LARGE_DATASET && (
				<LargeDatasetModal
					onConfirm={() => {
						if (!pendingLayer) return;

						commitLayer(pendingLayer);
						setPendingLayer(null);
						setActiveModal(null);
						clearStatus();
						setIsDirty(true);
					}}
					onDiscard={() => {
						setPendingLayer(null);
						setActiveModal(null);
						clearStatus();
					}}
				/>
			)}

			{activeModal === MODALS.HOW_TO && (
				<HowToModal onClose={() => setActiveModal(null)} />
			)}

			{activeModal === MODALS.ABOUT && (
				<AboutModal onClose={() => setActiveModal(null)} />
			)}
		</>
	);
}
