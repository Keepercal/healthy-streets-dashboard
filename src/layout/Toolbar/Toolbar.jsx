/* Style/UI */
import './Toolbar.css';
import { Download, CirclePlus, Save, Focus, Camera } from 'lucide-react';

/* Components */
import Brand from '../../components/Brand/Brand';
import ToolbarDropdown from './components/ToolbarDropdown/ToolbarDropdown';
import ToolbarButton from './components/ToolbarButton/ToolbarButton';
import BoundaryIndicator from '../../components/BoundaryIndicator/BoundaryIndicator';

/* Hooks */
import { useState, useRef } from 'react';
import { useClickOutside } from './hooks/useClickOutside';

/* Config */
import { menus } from './config/menus';

export default function Toolbar({
	onOpenModal,
	onNewWorkspace,
	onFocus,
	canExport,
	canSave,
	onSave,
	onScreenshot,
	isDirty,
	boundaryName,
}) {
	/* States */
	const [openMenu, setOpenMenu] = useState(null);
	const toolbarRef = useRef(null);

	function handleMenuItemClick(item) {
		switch (item.action) {
			case 'save':
				onSave();
				break;

			case 'newWorkspace':
				onNewWorkspace();
				break;

			case 'openProject':
				onOpenModal('openProject');
				break;

			case 'modal':
				onOpenModal(item.modal);
				break;
		}

		setOpenMenu(null);
	}

	/* Closes dropdown menu when user clicks anywhere on screen */
	useClickOutside(toolbarRef, () => {
		setOpenMenu(null);
	});

	/* Toggles menu */
	function toggleMenu(id) {
		setOpenMenu((current) => (current === id ? null : id));
	}

	const toolbarMenus = menus.map((menu) => ({
		...menu,
		items: menu.items.map((item) => ({
			...item,
			disabled: item.requires === 'canSave' ? !canSave : item.disabled,
		})),
	}));

	return (
		<div className="toolbar">
			<Brand />

			<div className="toolbar-content" ref={toolbarRef}>
				<ToolbarButton
					label="Save"
					title="Save project to file"
					icon={<Save size={18} />}
					indicator={isDirty}
					disabled={!isDirty || !canSave}
					onClick={onSave}
				/>
				<ToolbarButton
					label="Export"
					title="Export project as geospatial data format"
					icon={<Download size={18} />}
					disabled={!canExport}
					onClick={() => onOpenModal('export')}
				/>
				{toolbarMenus.map((menu) => (
					<ToolbarDropdown
						key={menu.id}
						label={menu.label}
						icon={<CirclePlus size={18} />}
						items={menu.items}
						isOpen={openMenu === menu.id}
						onToggle={() => toggleMenu(menu.id)}
						onItemClick={handleMenuItemClick}
					/>
				))}
			</div>

			<div className="toolbar-actions">
				<ToolbarButton
					title="Refocus viewport on current boundary"
					icon={<Focus size={18} />}
					disabled={!canSave}
					onClick={onFocus}
				/>
				<ToolbarButton
					title="Take screenshot of viewport"
					icon={<Camera size={18} />}
					disabled={!onScreenshot}
					onClick={onScreenshot}
				/>
				<BoundaryIndicator boundaryName={boundaryName} />
				{/*<a
					href="https://github.com/Keepercal/streets-dashboard"
					target="_blank"
					rel="noopener noreferrer"
					className="github-link"
					aria-label="Open GitHub repository"
				>
					<img src="./github-mark.svg" alt="GitHub" />
				</a>*/}
			</div>
		</div>
	);
}
