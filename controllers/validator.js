module.exports = {
    validateProject,
    validateAction
};

function validateProject(project) {
	const { name, description } = project;

	let errors = [];

	if (!name) {
		errors.push("Please provide a name for the project");
	}
	if (!description) {
		errors.push("Please provide a description for the project");
	}

	let success = errors.length === 0;
	let errorMessage = success
		? ""
		: "Information not valid, please see errors for details.";

	return {
		success,
		errorMessage,
		errors
	};
}


function validateAction(action) {
	const { notes, description, project_id } = action;

	let errors = [];

    if(!project_id){
        errors.push('No project with said id')
    }
	if (!notes) {
		errors.push("Please provide a notes for the action");
	}
	if (!description) {
		errors.push("Please provide a description for the action");
	}

	let success = errors.length === 0;
	let errorMessage = success
		? ""
		: "Information not valid, please see errors for details.";

	return {
		success,
		errorMessage,
		errors
	};
}