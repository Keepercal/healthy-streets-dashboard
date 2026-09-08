import { helpImages } from '../config/helpImages';

export default function SaveOpenProjectPage() {
	return (
		<>
			<h2>Saving and loading projects</h2>

			<p>
				{__APP_NAME__} includes the ability to <strong>Save</strong>,
				and <strong>Load </strong> projects for future use.
			</p>

			<p>
				As you add data to your map, your workspace will be saved
				automatically. This means that you will have the opportunity to
				restore your workspace should you close or refresh the
				application.
			</p>

			<p>
				Projects are saved to your browser's storage, meaning if you
				reset your browser or change browser, your work will be lost.
			</p>

			<h3>Save</h3>

			<p>
				When you add or remove data from your workspace, the save button
				will appear at the top with an indicator to show your workspace
				can be saved.
			</p>

			<p>
				If your workspace is not saved as a project, you will be
				prompted to give your current workspace a title and description.
				Upon saving, your workspace will be saved as a project, and any
				subsequent saves will overwrite the project.
			</p>

			<img
				src={helpImages.workspaceDirty}
				alt={`A screenshot of the ${__APP_NAME__} interface showing that the current workspace can be saved.`}
			/>

			<h3>Save As</h3>

			<p>
				Within the <strong>File</strong> dropdown in the toolbar, you
				can choose to manually save the current workspace as a new
				project. This can be used to create a duplicate of a project or
				change the title and description of the project.
			</p>

			<img
				src={helpImages.saveAs}
				alt={`A screenshot of the ${__APP_NAME__} interface that show a project being manually saved`}
			/>

			<h3>Open a Project</h3>

			<p>
				Any projects you save will appear within the
				<strong> Open Project</strong> window. Clicking on a project
				will load it into the workspace. If your workspace contains
				unsaved changes, you will be prompted to save your progress, or
				discard the workspace.
			</p>

			<p>
				Clicking the bin button next to a project will delete it. Note
				that anything you delete is lost forever.
			</p>

			<img
				src={helpImages.openProject}
				alt={`A screenshot of the ${__APP_NAME__} interface with a list of saved projects which can be opened.`}
			/>
		</>
	);
}
