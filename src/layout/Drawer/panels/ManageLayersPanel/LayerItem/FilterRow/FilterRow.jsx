import './FilterRow.css';

export default function FilterRow({
	filter,
	tags,
	getValues,
	updateFilter,
	removeFilter,
}) {
	const values = getValues(filter.key);

	return (
		<div className="filter-row">
			{/* Tag */}
			<select
				value={filter.key}
				onChange={(event) =>
					updateFilter(filter.id, {
						key: event.target.value,
						value: '',
					})
				}
			>
				<option value="">Select tag</option>

				{tags.map((tag) => (
					<option key={tag} value={tag}>
						{tag}
					</option>
				))}
			</select>

			{/* Operator */}
			<select
				value={filter.operator}
				onChange={(event) =>
					updateFilter(filter.id, {
						operator: event.target.value,
					})
				}
			>
				<option value="equals">EQUALS</option>

				<option value="not_equals">NOT EQUALS</option>

				<option value="exists">EXISTS</option>

				<option value="missing">MISSING</option>
			</select>

			{/* Value */}
			<select
				value={filter.value}
				onChange={(event) =>
					updateFilter(filter.id, {
						value: event.target.value,
					})
				}
				disabled={
					filter.operator === 'exists' ||
					filter.operator === 'missing'
				}
			>
				<option value="">Select value</option>

				{values.map((value) => (
					<option key={value} value={value}>
						{value}
					</option>
				))}
			</select>

			{/* Remove */}
			<button
				className="remove-filter-btn"
				onClick={() => removeFilter(filter.id)}
			>
				×
			</button>
		</div>
	);
}
