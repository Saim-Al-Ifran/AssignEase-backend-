const router = require('express').Router();

const {
    submitAssignment,
    getSubmittedAssignmentsByUser,
    getCreatedAssignmentsByUser,
    getAssignmentSubmissions,
    assignMarks,
    getAssignmentSubmission
 } = require('../controllers/submittedAssignmentController');

const { authenticate } = require('../middlewares/authenticate');
const upload = require('../middlewares/upload');

router.post('/',upload.single('pdfDoc'),submitAssignment);
router.get('/submitted_assignment',getSubmittedAssignmentsByUser);
router.get('/myCreatedAssignments',getCreatedAssignmentsByUser)
router.get('/assignment_submissions',getAssignmentSubmissions);
router.get('/assignment_submissions/:id',getAssignmentSubmission);
router.post('/assign_marks/:id',assignMarks)
 

module.exports = router;