import './ManageBoundaryPanel.css';

/* UI */
import DeleteButton from '@/components/DeleteButton/DeleteButton.jsx';
import BoundaryItem from '@/components/BoundaryItem/BoundaryItem';

/**
 * AddBoundaryPanel
 * ------------
 * For adding boundaries into the workspace.
 *
 * Selected boundaries are passed back to App, which then constructs OSM queries using the osm_id's of selected boundaries.
 */
const ManageBoundaryPanel = ({
	boundaries,
	hasBoundary,
	handleRemoveBoundary,
	handleClearBoundaries,
}) => {
	return (
		<>
			<div className="panel-header">
				<DeleteButton
					label="Remove All Boundaries"
					title={'Remove all boundaries from the current workspace'}
					onClick={handleClearBoundaries}
					disabled={!hasBoundary}
				/>
			</div>
			<div className="panel-body">
				{boundaries.map((boundary) => (
					<BoundaryItem
						key={boundary.osm_id}
						boundary={boundary}
						deleteButton={true}
						//onPreview={() => ()}
						onDelete={() => handleRemoveBoundary(boundary.osm_id)}
					/>
				))}
			</div>
		</>
	);
};

export default ManageBoundaryPanel;
