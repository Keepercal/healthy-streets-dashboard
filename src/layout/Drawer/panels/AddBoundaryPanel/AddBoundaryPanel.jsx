import './AddBoundaryPanel.css';

import { useState } from 'react';
import { Ghost } from 'lucide-react';

/* UI Components */
import InputItem from './components/InputItem/InputItem.jsx';
import BoundaryItem from '@/components/BoundaryItem/BoundaryItem.jsx';

/**
 * AddBoundaryPanel
 * ------------
 * User can search and add boundaries into the workspace.
 *
 * Selected boundaries are passed back to App, which then constructs OSM queries using the osm_id's of selected boundaries.
 */
const AddBoundaryPanel = ({
	fetchBoundaryResults,
	clearBoundaryResults,
	clearLayers,

	boundaryResults,
	handleSelectBoundary,
	handlePreviewBoundary,
}) => {
	const [hasSearched, setHasSearched] = useState(false);

	return (
		<>
			<div className="panel-header">
				<InputItem
					onSearch={fetchBoundaryResults}
					setHasSearched={setHasSearched}

					clearBoundaryResults={clearBoundaryResults}
					clearLayers={clearLayers}
				/>
			</div>

			<div className="panel-body">
				{hasSearched ? (
					<div className="boundary-results">
						{boundaryResults?.length > 0 ? (
							boundaryResults?.map((boundary) => (
								<BoundaryItem
									key={boundary.osm_id}
									boundary={boundary}
									addButton={true}
									onPreview={() =>
										handlePreviewBoundary(boundary)
									}
									onAdd={() => handleSelectBoundary(boundary)}
								/>
							))
						) : (
							<div className="empty-state">
								<Ghost size={180} />
								<p>
									Could not load any boundaries with that name
								</p>
							</div>
						)}
					</div>
				) : null}
			</div>
		</>
	);
};

export default AddBoundaryPanel;
