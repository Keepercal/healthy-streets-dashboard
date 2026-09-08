import './Modal.css';

/**
 * Modal
 * ------------
 * A generic template for all modals.
 */
export default function Modal({
	title,
	type,
	children,
	onClose,
	canClose = true,
	variant,
}) {
	return (
		<div className="modal-overlay">
			<div className={`modal modal--${variant}`}>
				<header className="modal-header">
					<h3 className={`modal-title ${type || ''}`}>{title}</h3>
					{canClose && (
						<button
							className="modal-close"
							onClick={onClose}
							aria-label="Close modal"
						>
							×
						</button>
					)}
				</header>

				<div className="modal-content">{children}</div>
			</div>
		</div>
	);
}
