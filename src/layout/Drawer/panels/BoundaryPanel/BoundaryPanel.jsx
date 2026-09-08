import './BoundaryPanel.css';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';

/* UI Components */
import InputItem from './components/InputItem/InputItem';
import BoundaryOption from './components/BoundaryOption/BoundaryOption';
import BoundaryIndicator from '../../../../components/BoundaryIndicator/BoundaryIndicator';
import DeleteButton from '../../../../components/DeleteButton/DeleteButton.jsx';

/**
 * BoundaryTab.jsx
 * ------------
 * UI component in sidebar which contains boundary selection
 *
 * Features:
 * - Select a boundary

 */
const BoundaryPanel = ({
	hasBoundary,
	loadBoundaryResults,
	clearBoundaryResults,
	handleClearBoundary,
	clearLayers,

	boundaryResults,
	selectedBoundaryKey,
	onSelectBoundary,
}) => {
	const [hasSearched, setHasSearched] = useState(false);

	return (
		<>
			<div className="panel-header">
				<DeleteButton
					icon={<Trash2 size={18} />}
					label="Remove Boundary"
					onClick={handleClearBoundary}
					disabled={!hasBoundary}
				/>
				<InputItem
					onSearch={loadBoundaryResults}
					setHasSearched={setHasSearched}

					clearBoundaryResults={clearBoundaryResults}
					clearLayers={clearLayers}
				/>
			</div>

			<div className="panel-body">
				{hasSearched ? (
					<div className="boundary-results">
						<BoundaryOption
							boundaryResults={boundaryResults}
							onSelectBoundary={onSelectBoundary}
							selectedBoundaryKey={selectedBoundaryKey}
							clearLayers={clearLayers}
						/>
					</div>
				) : null}
			</div>
		</>
	);
};

export default BoundaryPanel;
