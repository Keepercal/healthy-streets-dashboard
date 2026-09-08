import './ManageLayersPanel.css';
import LayerItem from './LayerItem/LayerItem';
import { Ghost, Trash2 } from 'lucide-react';

import DeleteButton from '../../../../components/DeleteButton/DeleteButton.jsx';

export default function ManageLayersPanel({
	featureLayers,
	toggleLayerVisibility,
	updateLayer,

	updateLayerFilters,

	removeLayer,
	renameLayer,
	clearLayers,
}) {
	const hasLayers = Object.keys(featureLayers).length > 0;

	return (
		<>
			<DeleteButton
				icon={<Trash2 size={18} />}
				label="Delete All Layers"
				onClick={clearLayers}
				disabled={!hasLayers}
			/>
			{!hasLayers ? (
				<div className="empty-state">
					<Ghost size={180} />
					<p>No feature layers loaded</p>
				</div>
			) : (
				<div className="panel-body">
					{Object.entries(featureLayers).map(([layerID, layer]) => (
						<LayerItem
							key={layerID}
							layerID={layerID}
							layer={layer}
							toggleLayerVisibility={toggleLayerVisibility}
							updateLayer={updateLayer}

							updateLayerFilters={updateLayerFilters}

							removeLayer={removeLayer}
							renameLayer={renameLayer}
						/>
					))}
				</div>
			)}
		</>
	);
}
