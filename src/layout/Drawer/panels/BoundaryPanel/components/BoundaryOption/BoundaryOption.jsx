import './BoundaryOption.css';
import { Ghost } from 'lucide-react';

const BoundaryOption = ({
	boundaryResults,
	selectedBoundaryID,
	handleSelectBoundary,
	clearLayers,
}) => {
	return boundaryResults?.length > 0 ? (
		boundaryResults?.map((result) => (
			<div
				key={result.osm_id}
				className={`boundary-card ${
					selectedBoundaryID === result.osm_id ? 'selected' : ''
				}`}
				onClick={() => {
					handleSelectBoundary(result);
					clearLayers();
				}}
			>
				{result.display_name} (
				{result.type.charAt(0).toUpperCase() + result.type.slice(1)}){}
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
