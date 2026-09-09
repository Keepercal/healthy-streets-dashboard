import './ProjectCard.css';
import { timeAgo } from '@/utils/timeAgo';

import { Trash2 } from 'lucide-react';

export default function ProjectCard({ project, onOpen, confirmDelete }) {
	const boundaries = project?.boundary?.boundaries ?? [];
	return (
		<div key={project.metadata.id} className="project-item">
			<button
				className="project-card"
				onClick={() => onOpen(project.metadata.id)}
			>
				<div className="project-card-content">
					<h3>{project.metadata.name}</h3>

					<div className="project-meta">
						<span>
							{boundaries[0]?.name}
							{boundaries[1] && `, ${boundaries[1].name}`}
							{boundaries[2] && `, ${boundaries[2].name}`}
							{boundaries.length > 3 &&
								` and ${boundaries.length - 3} others`}
						</span>
					</div>

					{project.metadata.description && (
						<p className="project-description">
							{project.metadata.description}
						</p>
					)}

					<span className="project-updated">
						<strong>Last modified: </strong>
						{timeAgo(project?.metadata.modified)}
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
	);
}
