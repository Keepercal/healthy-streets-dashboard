import './BoundaryOption.css';
import { Ghost } from 'lucide-react';

const BoundaryOption = ({
	boundaryResults,
	selectedBoundaryKey,
	onSelectBoundary,
	clearLayers,
}) => {
	return boundaryResults?.length > 0 ? (
		boundaryResults?.map((result) => (
			<div
				key={result.osm_id}
				className={`boundary-card ${
					selectedBoundaryKey === result.osm_id ? 'selected' : ''
				}`}
				onClick={() => {
					onSelectBoundary(result);
					clearLayers();
				}}
			>
				{result.display_name}
			</div>
		))
	) : (
		<div className="empty-state">
			<Ghost size={180} />
			<p>Could not load any boundaries with that name</p>
		</div>
	);
};

export default BoundaryOption;
