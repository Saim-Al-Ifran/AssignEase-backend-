const {
     getAllAssignments,
     getAssignmentById,
     createAssignment,
     updateAssignment
 } = require('../controllers/AssignmentController');

const router = require('express').Router();
const{authenticate} = require('../middlewares/authenticate');

router.get('/',getAllAssignments);
router.get('/:id',getAssignmentById);
router.post('/add',authenticate,createAssignment);
router.put('/edit/:id',authenticate,updateAssignment);

module.exports = router;