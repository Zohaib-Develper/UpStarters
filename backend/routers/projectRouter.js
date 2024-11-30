const projectController = require("./../controllers/projectController");
const authController = require("./../controllers/authController");
const express = require("express");
const upload = require("./../utils/multer");

const router = express.Router();

router.route("/category/:category").get(projectController.getProjectByCategory);

router
  .route("/userprojects")
  .get(authController.Protect, projectController.getProjectsOfUser);

router
  .route("/")
  .post(
    authController.Protect,
    upload.single("image"),
    projectController.addProject
  );

router.route("/all").get(projectController.allProjects);
router
  .route("/:id")
  .get(projectController.getProjectById)
  .patch(authController.Protect, projectController.updateProject)
  .delete(authController.Protect, projectController.deleteProject);

router
  .route("/relatedProjects/:id")
  .get(authController.Protect, projectController.getRelatedProjects);

module.exports = router;
