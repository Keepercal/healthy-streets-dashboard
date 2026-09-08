import './MapRibbon.css';
import countFeatures from '../../utils/countFeatures';

/**
 * MapRibbon
 * ------------
 * Displays a summary count across all loaded feature layers.
 */
const MapRibbon = ({ features, projectName }) => {
	const { nodeCount, wayCount, relationCount } = countFeatures(features);

	return (
		<div className="map-ribbon-content">
			<div className="feature-counter">
				<p>Nodes {nodeCount}</p>

				<p>Ways {wayCount}</p>

				<p>Relations {relationCount}</p>
			</div>
			<div className="current-project">
				<p>Current Project: {projectName}</p>
			</div>
		</div>
	);
};

export default MapRibbon;
