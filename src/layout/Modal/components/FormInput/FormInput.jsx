import './FormInput.css';

export default function FormInput({
	label,
	type = 'text',
	value,
	onChange,
	placeholder,
	error,
}) {
	return (
		<div className="form-input">
			<label>{label}</label>

			{type === 'textarea' ? (
				<>
					<textarea
						value={value}
						onChange={onChange}
						placeholder={placeholder}
					/>
				</>
			) : (
				<input
					type={type}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
				/>
			)}

			{error && <div className="field-error">{error}</div>}
		</div>
	);
}
