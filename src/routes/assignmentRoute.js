const {
     getAllAssignments,
     getAssignmentById,
     createAssignment,
     updateAssignment,
     deleteAssignment
 } = require('../controllers/AssignmentController');

const router = require('express').Router();
const{authenticate} = require('../middlewares/authenticate');

router.get('/',getAllAssignments);
router.get('/:id',getAssignmentById);
router.post('/add',authenticate,createAssignment);
router.put('/edit/:id',authenticate,updateAssignment);
router.delete('/:id',deleteAssignment)

module.exports = router;