import { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';
import Popup from '../Popup';

/**
 * StatusPopup
 * ----------------
 * Displays application status messages:
 * - loading states
 * - errors
 * - alerts
 */
export default function StatusPopup({
	trigger,
	type,
	title,
	message,
	onClose,
	children,
	drawerOpen,
}) {
	const [visible, setVisible] = useState(trigger);
	const [closing, setClosing] = useState(false);

	useEffect(() => {
		if (trigger) {
			setVisible(true);
			setClosing(false);
		} else if (visible) {
			setClosing(true);

			const timer = setTimeout(() => {
				setVisible(false);
			}, 250);

			return () => clearTimeout(timer);
		}
	}, [trigger, visible]);

	if (!visible) return null;

	return (
		<Popup
			title={title}
			type={type}
			onClose={onClose}
			drawerOpen={drawerOpen}
			className={closing ? 'closing' : ''}
		>
			{message && <p className={`popup-message ${type}`}>{message}</p>}

			{type === 'loading' && (
				<div className="popup-loader">
					<BarLoader width="100%" />
				</div>
			)}

			{children}
		</Popup>
	);
}
