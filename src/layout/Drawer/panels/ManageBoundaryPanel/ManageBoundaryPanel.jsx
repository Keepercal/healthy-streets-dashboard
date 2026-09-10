import './ManageBoundaryPanel.css';

/* UI */
import DeleteButton from '@/components/DeleteButton/DeleteButton.jsx';
import BoundaryItem from '@/components/BoundaryItem/BoundaryItem';

import { Trash2 } from 'lucide-react';

const ManageBoundaryPanel = ({
	boundaries,
	hasBoundary,
	handleClearBoundary,
}) => {
	return (
		<>
			<div className="panel-header">
				<DeleteButton
					icon={<Trash2 size={18} />}
					label="Remove All Boundaries"
					onClick={handleClearBoundary}
					disabled={!hasBoundary}
				/>
			</div>
			<div className="panel-body">
				{boundaries.map((boundary) => (
					<BoundaryItem
						key={boundary.osm_id}
						boundary={boundary}
						actionButtons={true}
					/>
				))}
			</div>
		</>
	);
};

export default ManageBoundaryPanel;
