import OverviewPage from '../pages/OverviewPage';
import DataTypesPage from '../pages/DataTypesPage';
import FileFormatsPage from '../pages/FileFormatsPage';
import LicencePage from '../pages/LicencePage';

export const pages = [
	{
		id: 'overview',
		title: 'Overview',
		component: <OverviewPage />,
	},
	{
		id: 'licence',
		title: 'Licence',
		component: <LicencePage />,
	},
	{
		id: 'data-types',
		title: 'OSM Data Types',
		component: <DataTypesPage />,
	},
	{
		id: 'file-formats',
		title: 'File Formats',
		component: <FileFormatsPage />,
	},
];
