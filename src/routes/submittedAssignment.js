const router = require('express').Router();

const {
    submitAssignment,
    getSubmittedAssignmentsByUser,
    getCreatedAssignmentsByUser
 } = require('../controllers/submittedAssignmentController');

const { authenticate } = require('../middlewares/authenticate');
const upload = require('../middlewares/upload');

router.post('/',authenticate,upload.single('pdfDoc'),submitAssignment);
router.get('/submitted_assignment',authenticate,getSubmittedAssignmentsByUser);
router.get('/myCreatedAssignments',authenticate,getCreatedAssignmentsByUser)
 

module.exports = router;