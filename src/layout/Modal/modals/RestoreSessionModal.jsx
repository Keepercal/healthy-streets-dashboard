import Modal from '../Modal';

export default function RestoreSessionModal({
	onRestore,
	onStartNew,
	onClose,
}) {
	return (
		<Modal title="Restore Workspace?" onClose={onClose} canClose={false}>
			<section className="modal-section">
				<h3>
					A previous workspace with data was found. Would you like to
					restore it?
				</h3>
			</section>

			<section className="modal-actions">
				<button className="secondary-btn warning" onClick={onStartNew}>
					Start New Workspace
				</button>
				<button className="primary-btn" onClick={onRestore}>
					Restore Workspace
				</button>
			</section>
		</Modal>
	);
}
