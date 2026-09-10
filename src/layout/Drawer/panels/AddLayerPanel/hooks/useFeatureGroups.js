import { useEffect, useMemo, useState } from 'react';

export default function useFeatureGroups(featureOptions) {
	const [openGroups, setOpenGroups] = useState({});

	/* Group features by category */
	const groupedFeatures = useMemo(() => {
		return Object.entries(featureOptions || {}).reduce(
			(groups, [key, feature]) => {
				const group = feature.group;

				if (!group) return groups;

				if (!groups[group]) {
					groups[group] = [];
				}

				groups[group].push({
					key,
					...feature,
				});

				// Sort the group
				groups[group].sort((a, b) => a.key.localeCompare(b.label));

				return groups;
			},
			{}
		);
	}, [featureOptions]);

	/* Initialize group open/closed state */
	useEffect(() => {
		if (!featureOptions) return;

		setOpenGroups((prev) => {
			const initial = Object.values(featureOptions).reduce(
				(groups, feature) => {
					if (feature?.group) {
						groups[feature.group] = false;
					}

					return groups;
				},
				{}
			);
			return { ...initial, ...prev };
		});
	}, [featureOptions]);

	/**
	 * Toggle group visibility
	 */
	const toggleGroup = (group) => {
		setOpenGroups((prev) => ({
			...prev, // impacts whether more than one accordian can be open at the same time
			[group]: !prev[group],
		}));
	};

	return {
		groupedFeatures,
		openGroups,
		toggleGroup,
	};
}
