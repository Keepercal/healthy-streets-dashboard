import './BoundaryIndicator.css';

function BoundaryIndicator({ boundaryName }) {
	return (
		<div className="boundary-indicator">
			<div className="header">
				<h4>Current Boundary</h4>
			</div>

			<div className="content">
				<p>{boundaryName}</p>
			</div>
		</div>
	);
}

export default BoundaryIndicator;
