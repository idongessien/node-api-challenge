const router = require("express").Router();

const Action = require("../data/helpers/actionModel.js");
const Project = require("../data/helpers/projectModel.js");
const { validateProject, validateAction } = require("./validator.js");

router.get("/:id", (req, res) => {
	Project.get(req.params.id)
		.then(projects => {
			res.status(200).json(projects);
		})
		.catch(error => {
			// log error to server
			console.log(error);
			res.status(500).json({
				message: "Error retrieving the project"
			});
		});
});

router.post("/", (req, res) => {
	const projectData = req.body;
	const valid = validateProject(projectData);

	if (valid.success) {
		Project.insert(projectData);
		res
			.status(201)
			.json({ message: "successfully added project", projectData });
	} else {
		res.status(400).json(valid);
	}
});

router.put("/:id", (req, res) => {
	const id = req.params.id;
	const updates = req.body;
	const valid = validateProject(updates);

	if (valid.success) {
		Project.update(id, updates)
			.then(project => {
				if (project) {
					res.status(200).json({ message: "project updated", project });
				} else {
					res.status(404).json({ message: "Project not found." });
				}
			})
			.catch(error => {
				// log error to server
				console.log(error);
				res.status(500).json({
					message: "Error retrieving the project"
				});
			});
	}
});

router.delete("/:id", (req, res) => {
	id = req.params.id;

	Project.remove(id)
		.then(removed => {
			if (removed) {
				res
					.status(200)
					.json({ message: "project successfully removed", removed });
			} else {
				res
					.status(404)
					.json({ message: `No project listed with the ID number of ${id}.` });
			}
		})
		.catch(error => {
			// log error to server
			console.log(error);
			res.status(500).json({
				message: "Error retrieving the project"
			});
		});
});

router.get("/:id/actions", (req, res) => {
	const id = req.params.id;
	Project.getProjectActions(id)
		.then(actions => {
			res.status(200).json(actions);
		})
		.catch(error => {
			// log error to server
			console.log(error);
			res.status(500).json({
				message: "Error retrieving actions"
			});
		});
});

router.post("/:id/actions/:id", (req, res) => {
	const id = req.params.id;
	Project.getProjectActions(id)
		.then(actions => {
			res.status(200).json(actions);
		})
		.catch(error => {
			// log error to server
			console.log(error);
			res.status(500).json({
				message: "Error retrieving actions"
			});
		});
});


router.put("/:id/actions/:id", (req, res) => {
    const id = req.params.id;
    const updates = req.body
    const valid = validateAction(updates);
    
    if (valid.success) {

        Action.update(id, updates)
        res
            .status(201)
            .json({ message: "successfully added action", updates });
    } else {
        res.status(400).json(valid);
    }
		
});



router.delete("/:id/actions/:id", (req, res) => {
	id = req.params.id;

	Action.remove(id)
		.then(removed => {
			if (removed) {
				res
					.status(200)
					.json({ message: "project successfully removed", removed });
			} else {
				res
					.status(404)
					.json({ message: `No project listed with the ID number of ${id}.` });
			}
		})
		.catch(error => {
			// log error to server
			console.log(error);
			res.status(500).json({
				message: "Error retrieving the project"
			});
		});
});


module.exports = router;