import { useState } from 'react';

import { getProject, saveProject as saveProjectToDB } from '../db/projectDB';

import { createProject } from '../models/project';

export default function useProjectManager({
	workspace,
	session,
	restore,
	resetWorkspace,
	onSaveAsRequested,
	onDirtyChange,
}) {
	const [project, setProject] = useState(null);

	async function openProject(projectId) {
		const project = await getProject(projectId);

		if (!project) {
			console.error('Project not found');
			return;
		}

		console.log('[DEBUG] Opening project:', project);

		setProject(project);

		restore.restoreSession({
			projectId: project.metadata.id,
			data: {
				settings: project.settings,
				boundary: project.boundary,
				layers: project.layers,
			},
		});

		onDirtyChange(false);
	}

	/*
	 * Saves the current project
	 */
	async function saveCurrentProject() {
		if (!project) {
			console.log('[DEBUG] No existing project, opening Save As');
			onSaveAsRequested?.();
			return;
		}

		const updatedProject = {
			...project,

			metadata: {
				...project.metadata,
				modified: new Date().toISOString(),
			},

			settings: {
				basemap: workspace.basemap,
				displayMode: workspace.displayMode,
			},

			boundary: {
				selectedBoundaryKey: workspace.selectedBoundaryKey,
				data: workspace.boundaryData,
				geojson: workspace.boundaryGeojson,
			},

			layers: workspace.exportLayers(),
		};

		await saveProjectToDB(updatedProject);

		console.log('[DEBUG] Saving project', updatedProject);

		setProject(updatedProject);
		onDirtyChange(false);

		console.log('[DEBUG] Project saved:', project);

		return true;
	}

	/*
	 * Creates a brand new project
	 */
	async function saveProjectAs(name, description) {
		const newProject = createProject({
			metadata: {
				name,
				description,
			},

			settings: {
				basemap: workspace.basemap,
				displayMode: workspace.displayMode,
			},

			boundary: {
				selectedBoundaryKey: workspace.selectedBoundaryKey,
				data: workspace.boundaryData,
				geojson: workspace.boundaryGeojson,
			},

			layers: workspace.exportLayers(),
		});

		await saveProjectToDB(newProject);

		console.log('[DEBUG] Saving project', newProject);

		setProject(newProject);

		// Link the current session to this project
		session.setSessionInfo((prev) => ({
			...prev,
			projectId: newProject.metadata.id,
			modified: new Date().toISOString(),
		}));

		onDirtyChange(false);

		console.log('[DEBUG] Project saved:', project);

		return newProject;
	}

	return {
		project,
		setProject,

		openProject,
		saveCurrentProject,
		saveProjectAs,
	};
}
