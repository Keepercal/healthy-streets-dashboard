import './FeatureItem.css';
import { Plus, Database } from 'lucide-react';

export default function FeatureItem({
	features,
	handleAddLayer,
	cachedFeatures,
}) {
	return (
		<>
			{features?.map(({ key, tag, type, label }) => {
				const isCached = cachedFeatures.includes(key);

				return (
					<button
						key={key}
						className="add-layer-btn"
						onClick={() =>
							handleAddLayer(key, tag, key, type, label)
						}
					>
						<Plus size={16} />

						{label}

						{isCached && (
							<>
								<span className="cached-wrapper">
									<Database
										className="cached-icon"
										size={16}
										title="Cached data avaliable"
									/>

									<span className="tooltip">
										Cached data available
									</span>
								</span>
							</>
						)}
					</button>
				);
			})}
		</>
	);
}
