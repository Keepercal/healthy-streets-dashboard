import './SidebarButton.css';

const SidebarButton = ({
	label,
	icon,
	isCollapsed,
	active,
	disabled,
	onClick,
}) => (
	<button
		className={`sidebar-button 
            ${active ? 'active' : ''}
            ${disabled ? 'disabled' : ''}
        `}
		disabled={disabled}
		onClick={onClick}
	>
		{icon && <span className="sidebar-button-icon">{icon}</span>}

		{!isCollapsed ? (
			<span className="sidebar-button-label">{label}</span>
		) : (
			<span className="sidebar-button-label"></span>
		)}
	</button>
);

export default SidebarButton;
