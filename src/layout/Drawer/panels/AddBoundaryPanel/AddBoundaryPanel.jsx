import './AddBoundaryPanel.css';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';

/* UI Components */
import InputItem from './components/InputItem/InputItem.jsx';
import BoundaryResults from './components/BoundaryResults/BoundaryResults.jsx';
import DeleteButton from '../../../../components/DeleteButton/DeleteButton.jsx';

/**
 * AddBoundaryPanel
 * ------------
 * For adding boundaries into the workspace.
 *
 * Selected boundaries are passed back to App, which then constructs OSM queries using the osm_id's of selected boundaries.
 */
const AddBoundaryPanel = ({
	hasBoundary,
	loadBoundaryResults,
	clearBoundaryResults,
	handleClearBoundary,
	clearLayers,

	boundaryResults,
	selectedBoundaryIds,
	handleSelectBoundary,
}) => {
	const [hasSearched, setHasSearched] = useState(false);

	return (
		<>
			<div className="panel-header">
				<InputItem
					onSearch={loadBoundaryResults}
					setHasSearched={setHasSearched}

					clearBoundaryResults={clearBoundaryResults}
					clearLayers={clearLayers}
				/>
				<DeleteButton
					icon={<Trash2 size={18} />}
					label="Remove All Boundaries"
					onClick={handleClearBoundary}
					disabled={!hasBoundary}
				/>
			</div>

			<div className="panel-body">
				{hasSearched ? (
					<div className="boundary-results">
						<BoundaryResults
							boundaryResults={boundaryResults}
							handleSelectBoundary={handleSelectBoundary}
							selectedBoundaryIds={selectedBoundaryIds}
							clearLayers={clearLayers}
						/>
					</div>
				) : null}
			</div>
		</>
	);
};

export default AddBoundaryPanel;
