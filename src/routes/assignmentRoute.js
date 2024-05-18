const {
     getAllAssignments,
     getAssignmentById,
     createAssignment,
     updateAssignment,
     deleteAssignment
 } = require('../controllers/AssignmentController');

const router = require('express').Router();
const{authenticate} = require('../middlewares/authenticate');

router.get('/', getAllAssignments);
router.post('/',createAssignment);
router.get('/:id', getAssignmentById);
router.put('/:id',updateAssignment);
router.delete('/:id',deleteAssignment);
// router.get('/', getAllAssignments);
// router.post('/',authenticate, createAssignment);
// router.get('/:id', getAssignmentById);
// router.put('/:id',authenticate, updateAssignment);
// router.delete('/:id',authenticate ,deleteAssignment);

module.exports = router;