import {
	createProjectData,
	createProjectDataFromWorkspace,
} from './projectData';

const VERSION = 1;

/**
 * createSession
 * -----------
 * Creates a Session model from session-shaped data.
 */
export function createSession(overrides = {}) {
	const now = new Date().toISOString();

	return {
		version: VERSION,

		metadata: {
			id: crypto.randomUUID(),
			projectId: null, // null means this is just a scratch session
			created: now,
			modified: now,
			...overrides.metadata,
		},

		data: createProjectData(overrides.data),
	};
}

/**
 * createSessionFromWorkspace
 * -----------
 * Creates a Session model from workspace state.
 */
export function createSessionFromWorkspace(workspace, metadata = {}) {
	return createSession({
		metadata,
		data: createProjectDataFromWorkspace(workspace),
	});
}

/**
 * updateProject
 * -----------
 * Updates a Session model from session-shaped data.
 */
export function updateSession(session, changes = {}) {
	return {
		...session,

		metadata: {
			...session.metadata,
			...changes.metadata,
			modified: new Date().toISOString(),
		},

		data: {
			...session.data,
			...changes.data,
		},
	};
}

/**
 * updateProjectFromWorkspace
 * -----------
 * Updates a Session model from workspace state.
 */
export function updateSessionFromWorkspace(session, workspace) {
	return updateSession(session, {
		data: createProjectDataFromWorkspace(workspace),
	});
}
