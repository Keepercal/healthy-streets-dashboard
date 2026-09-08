import './AddLayersPanel.css';
import FeatureItem from './FeatureItem';

/* HOOKS */
import useFeatureGroups from './hooks/useFeatureGroups.js';

/* CONSTANTS */
import GROUP_LABELS from './constants/featureGroups.js';

/**
 * AddLayersPanel.jsx
 * ------------
 * UI component in sidebar which contains feature options
 *
 * Features:
 * - Load features from a preselect list
 */
const AddLayersPanel = ({ featureOptions, handleAddLayer, cachedFeatures }) => {
	const { groupedFeatures, openGroups, toggleGroup } =
		useFeatureGroups(featureOptions);

	return (
		<>
			{Object.entries(groupedFeatures).map(([group, features]) => (
				<div key={group} className="accordion-group">
					{/* LEVEL 2 HEADER */}
					<h4
						className="accordion-header"
						onClick={() => toggleGroup(group)}
					>
						{GROUP_LABELS[group] || group}
						<span
							className={`arrow ${openGroups[group] ? 'rotated' : ''}`}
						>
							▸
						</span>
					</h4>

					{/* LEVEL 3 CONTENT */}
					<div
						className={`accordion-content ${openGroups[group] ? 'open' : ''}`}
					>
						<FeatureItem
							features={features}
							handleAddLayer={handleAddLayer}
							cachedFeatures={cachedFeatures}
						/>
					</div>
				</div>
			))}
		</>
	);
};

export default AddLayersPanel;
