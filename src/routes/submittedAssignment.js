const router = require('express').Router();

const {
    submitAssignment,
    getSubmittedAssignmentsByUser,
    getCreatedAssignmentsByUser,
    getAssignmentSubmissions,
    assignMarks
 } = require('../controllers/submittedAssignmentController');

const { authenticate } = require('../middlewares/authenticate');
const upload = require('../middlewares/upload');

router.post('/',upload.single('pdfDoc'),submitAssignment);
router.get('/submitted_assignment',getSubmittedAssignmentsByUser);
router.get('/myCreatedAssignments',getCreatedAssignmentsByUser)
router.get('/assignment_submissions',getAssignmentSubmissions);
router.post('/assign_marks',assignMarks)
 

module.exports = router;