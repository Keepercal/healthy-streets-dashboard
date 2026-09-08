import './ModalNav.css';

export default function ModalNav({ items, active, onChange }) {
	return (
		<nav className="modal-nav">
			{items.map((item) => (
				<button
					key={item.id}
					className={active === item.id ? 'active' : ''}
					onClick={() => onChange(item.id)}
				>
					{item.title}
				</button>
			))}
		</nav>
	);
}
