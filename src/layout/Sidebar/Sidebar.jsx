import './Sidebar.css';

/* UI COMPONENTS */
import SidebarButton from './components/SidebarButton';

import BoundaryIndicator from '../../components/BoundaryIndicator/BoundaryIndicator';

/* CONSTANTS */
import GROUP_LABELS from '../Drawer/panels/AddLayersPanel/constants/featureGroups';

/* API imports */
import {
	Map,
	LayersPlus,
	Layers,
	MonitorCog,
	ArrowLeftFromLine,
	ArrowRightFromLine,
} from 'lucide-react';

/**
 * Sidebar.jsx
 * ------------
 * UI component to toggle data onto map
 *
 * Features:
 * - Select a boundary
 * - Load features from a preselect list
 */
const Sidebar = ({
	boundaryData,
	featureLayers,

	activeDrawer,
	setActiveDrawer,

	collapsed,
	setCollapsed,
}) => {
	const openDrawer = (name) => {
		setActiveDrawer((prev) => (prev === name ? null : name));
	};

	const hasBoundary = !!boundaryData;
	//const hasFeatures =  featureLayers && Object.keys(featureLayers).length > 0;

	return (
		<div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
			<div className="sidebar-content">
				<SidebarButton
					label="Boundary"
					icon={<Map />}
					isCollapsed={collapsed}
					active={activeDrawer === 'boundary'}
					onClick={() => openDrawer('boundary')}
				/>

				<SidebarButton
					label="Add Layers"
					icon={<LayersPlus />}
					isCollapsed={collapsed}
					disabled={!hasBoundary}
					active={activeDrawer === 'addLayers'}
					onClick={() => {
						openDrawer('addLayers');
					}}
				/>

				<SidebarButton
					label="Manage Layers"
					icon={<Layers />}
					isCollapsed={collapsed}
					disabled={!hasBoundary}
					active={activeDrawer === 'manageLayers'}
					onClick={() => {
						openDrawer('manageLayers');
					}}
				/>

				<SidebarButton
					label="Display"
					icon={<MonitorCog />}
					isCollapsed={collapsed}
					active={activeDrawer === 'display'}
					onClick={() => openDrawer('display')}
				/>
			</div>

			<button
				className="close-sidebar-button"
				onClick={() => setCollapsed((prev) => !prev)}
			>
				{collapsed ? (
					<ArrowRightFromLine size={18} />
				) : (
					<ArrowLeftFromLine size={18} />
				)}
			</button>
		</div>
	);
};

export default Sidebar;
