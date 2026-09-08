import './OpenProjectModal.css';
import { Trash2 } from 'lucide-react';

import { useEffect } from 'react';

import Modal from '../../Modal';

import { timeAgo } from '@/utils/timeAgo';

/**
 * OpenProjectModal
 * ------------
 * Creates a modal with a list of saved projects, allowing the user to open and delete projects.
 */
export default function OpenProjectModal({
	onOpen,
	onClose,
	projects,
	loadProjects,
	handleDeleteProject,
	hasSavedProjects,
}) {
	useEffect(() => {
		loadProjects();
	}, [loadProjects]);

	// Prompt user to confirm deletion
	const confirmDelete = (project) => {
		if (window.confirm(`Delete project "${project.metadata.name}"?`)) {
			handleDeleteProject(project.metadata.id);
		}
	};

	return (
		<Modal title="Open project" onClose={onClose}>
			<section className="modal-section">
				{!hasSavedProjects ? (
					<div className="no-projects">
						<p>No projects have been saved</p>
					</div>
				) : (
					<div className="project-list">
						{projects.map((project) => (
							<div
								key={project.metadata.id}
								className="project-item"
							>
								<button
									className="project-card"
									onClick={() => onOpen(project.metadata.id)}
								>
									<div className="project-card-content">
										<h3>{project.metadata.name}</h3>

										<div className="project-meta">
											<span>
												{project?.boundary.data
													.elements?.[0]?.tags
													?.name ?? 'None'}
											</span>
										</div>

										{project.metadata.description && (
											<p className="project-description">
												{project.metadata.description}
											</p>
										)}

										<span className="project-updated">
											<strong>Last modified: </strong>
											{timeAgo(
												project?.metadata.modified
											)}
										</span>
									</div>
								</button>
								<button
									className="project-card-delete"
									onClick={() => confirmDelete(project)}
									aria-label={`Delete ${project.metadata.name}`}
								>
									<Trash2 size={22} />
								</button>
							</div>
						))}
					</div>
				)}
			</section>
		</Modal>
	);
}
