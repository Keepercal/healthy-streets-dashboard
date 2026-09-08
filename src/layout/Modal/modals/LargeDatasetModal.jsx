import Modal from '../Modal';

export default function LargeDatasetModal({ onConfirm, onDiscard }) {
	return (
		<Modal title="Warning" canClose={false}>
			<section className="modal-section">
				<h3>Large Incoming Payload</h3>
				<p>
					The incoming payload from the Overpass API contains a large
					amount of data. Loading this onto the map may cause
					performance issues. Would you like to continue?
				</p>
			</section>

			<section className="modal-actions">
				<button className="secondary-btn" onClick={onDiscard}>
					Abort
				</button>

				<button className="primary-btn" onClick={onConfirm}>
					Accept & Continue
				</button>
			</section>
		</Modal>
	);
}
