import './BoundaryItem.css';

import { Trash2 } from 'lucide-react';

const BoundaryItem = ({
	boundary,
	onClick,
	actionButtons = false,
	onDelete,
}) => {
	/*const confirmDelete = (project) => {
		if (window.confirm(`Delete project "${project.metadata.name}"?`)) {
			handleDeleteProject(project.metadata.id);
		}
	};*/
	return (
		<div className="boundary-item">
			<div
				key={boundary.osm_id}
				className={`boundary-card ${boundary.osm_id ? 'selected' : ''}`}
				onClick={onClick}
			>
				{boundary.display_name}
			</div>
			{actionButtons && (
				<button
					className="boundary-card-delete"
					onClick={(event) => {
						event.stopPropagation();
						onDelete?.(boundary);
					}}
					aria-label={`Delete boundary${boundary.name}?`}
				>
					<Trash2 size={22} />
				</button>
			)}
		</div>
	);
};

export default BoundaryItem;
