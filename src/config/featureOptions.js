import { FEATURE_MAP } from './osmFeatureMap';

export const FEATURE_OPTIONS = Object.entries(FEATURE_MAP).flatMap(
	([group, features]) =>
		Object.entries(features).map(([key, feature]) => ({
			value: key,
			key,
			group,
			tag: feature.tag,
			label: feature.label,
			type: feature.type,
		}))
);
