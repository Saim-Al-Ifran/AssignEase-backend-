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

router.post('/',authenticate,upload.single('pdfDoc'),submitAssignment);
router.get('/submitted_assignment',authenticate,getSubmittedAssignmentsByUser);
router.get('/myCreatedAssignments',authenticate,getCreatedAssignmentsByUser)
router.get('/assignment_submissions',authenticate,getAssignmentSubmissions);
router.post('/assign_marks',authenticate,assignMarks)
 

module.exports = router;