const projectController = require('./../controllers/projectController');
const authController = require('./../controllers/authController')
const express = require('express')
const upload = require('./../utils/multer')

const router = express.Router();

router.route('/').get(projectController.All_Active_Projects).post(authController.Protect, upload.single('image'), projectController.AddProject)
router.route('/all').get(authController.Protect, authController.RestrictTo('admin'), projectController.All_Projects)
router.route('/:id').get(projectController.GetProjectByID).patch(authController.Protect, projectController.UpdateProject).delete(authController.Protect, projectController.DeleteProject);




router.route('/:id/approve').get(authController.Protect, authController.RestrictTo('admin'), projectController.ApproveProject)
router.route('/:id/reject').get(authController.Protect, authController.RestrictTo('admin'), projectController.RejectProject)

router.route('/:id/progress').get(authController.Protect, projectController.ProjectProgress)

module.exports = router