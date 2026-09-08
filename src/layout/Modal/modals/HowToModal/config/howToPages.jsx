import GettingStartedPage from '../pages/GettingStartedPage';
import AddingLayersPage from '../pages/AddingLayersPage';
import ManagingLayersPage from '../pages/ManagingLayersPage';
import DisplaySettingsPage from '../pages/DisplaySettingsPage';
import SaveOpenProjectPage from '../pages/SaveOpenProjectPage';
import ExportProjectPage from '../pages/ExportProjectPage';

export const pages = [
	{
		id: 'getting-started',
		title: 'Getting Started',
		component: <GettingStartedPage />,
	},
	{
		id: 'adding-layers',
		title: 'Adding Layers',
		component: <AddingLayersPage />,
	},
	{
		id: 'managing-layers',
		title: 'Managing Layers',
		component: <ManagingLayersPage />,
	},
	{
		id: 'display-settings',
		title: 'Display Settings',
		component: <DisplaySettingsPage />,
	},
	{
		id: 'save-open-project',
		title: 'Saving & Loading Projects',
		component: <SaveOpenProjectPage />,
	},
	{
		id: 'export-project',
		title: 'Exporting Projects',
		component: <ExportProjectPage />,
	},
];
