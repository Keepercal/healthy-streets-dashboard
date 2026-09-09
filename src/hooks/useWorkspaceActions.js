const LARGE_DATASET_LIMIT = 5000;
import MODALS from '@/config/modalTypes.js';

export default function useWorkspaceActions({
	// boundary
	selectedBoundaryIds,
	setBoundary,
	clearBoundary,

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
	};

	/**
	 * Handle resetting boundary and wiping features
	 */
	const handleClearBoundary = () => {
		clearBoundary();
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
		handleClearBoundary,
		renameLayer,
		handleAddLayer,
	};
}
