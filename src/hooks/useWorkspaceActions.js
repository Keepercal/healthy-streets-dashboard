const LARGE_DATASET_LIMIT = 5000;
import MODALS from '@/config/modalTypes.js';

export default function useWorkspaceActions({
	// boundary
	selectedBoundaryKey,
	setSelectedBoundaryKey,
	loadBoundary,
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
	const handleSelectBoundary = (result) => {
		console.log('[DEBUG] handleSelectBoundary ENTER:', result);

		const {
			osm_id: boundaryID,
			osm_type: boundaryType,
			display_name: boundaryName,
		} = result;

		setSelectedBoundaryKey(boundaryID);

		loadBoundary(boundaryID, boundaryType, boundaryName);
	};

	/**
	 * Handle resetting boundary and wiping features
	 */
	const handleClearBoundary = () => {
		setSelectedBoundaryKey('none');
		clearBoundary();
		clearLayers();
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
			`Calling loadLayer with boundary key: ${selectedBoundaryKey}`
		);

		const preparedLayer = await loadLayer({
			featureKey,
			boundaryKey: selectedBoundaryKey,
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
