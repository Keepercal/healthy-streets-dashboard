const LARGE_DATASET_LIMIT = 5000;
import MODALS from '@/config/modalTypes.js';

/**
 * useWorkspaceActions
 * -----------
 * Handles actions taken within the UI of the application, such as selecting a boundary or renaming a layer
 *
 */
export default function useWorkspaceActions({
	// boundary
	selectedBoundaryIds,
	setBoundary,
	handlePreviewBoundary,
	removeBoundary,
	clearBoundaries,

	// layers
	clearLayers,
	updateLayer,
	loadLayer,
	commitLayer,

	// UI
	setPendingLayer,
	setActiveModal,
	setIsDirty,
}) {
	/**
	 * Handle input for boundary search
	 */
	const handleSelectBoundary = (boundaryData) => {
		setBoundary(boundaryData);
		handlePreviewBoundary(null);
	};

	/**
	 * Removes a single boundary from the workspace
	 */
	const handleRemoveBoundary = (osmId) => {
		removeBoundary(osmId);

		setIsDirty(false);
	};

	/**
	 * Removes all boundaries from the workspace
	 */
	const handleClearBoundaries = () => {
		clearBoundaries();
		clearLayers();

		setIsDirty(false);
	};

	/**
	 * Handle renaming features
	 */
	const renameLayer = (layerID, newLabel) => {
		updateLayer(layerID, {
			displayName: newLabel,
		});
	};

	/**
	 * Handle feature adding to project
	 */
	const handleAddLayer = async (
		featureKey,
		featureTag,
		featureValue,
		featureType,
		featureLabel
	) => {
		console.log(
			`Calling loadLayer with boundary ID: ${selectedBoundaryIds}`
		);

		const preparedLayer = await loadLayer({
			featureKey,
			boundaryIDs: selectedBoundaryIds,
			featureTag,
			featureValue,
			featureType,
			featureLabel,
		});

		if (!preparedLayer) return;

		if (preparedLayer.totalCount > LARGE_DATASET_LIMIT) {
			setPendingLayer(preparedLayer);
			setActiveModal(MODALS.LARGE_DATASET);
			return;
		}

		commitLayer(preparedLayer);
		setIsDirty(true);
	};

	return {
		handleSelectBoundary,
		handleRemoveBoundary,

		handleClearBoundaries,

		renameLayer,
		handleAddLayer,
	};
}
