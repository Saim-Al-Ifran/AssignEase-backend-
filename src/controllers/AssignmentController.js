
const Assignment= require('../model/Assignment');
const CustomError = require("../error/CustomError");


const getAllAssignments = async (req, res) => {
    try {
      // Retrieve all assignments from the database
      const assignments = await Assignment.find();
  
      res.json({ success: true, data: assignments });
    } catch (err) {
       return next(CustomError(err.message,500))
    }
  };

const getAssignmentById = async (req, res) => {
    try {
      const assignmentId = req.params.id;
  
      // Find the assignment by ID
      const assignment = await Assignment.findById(assignmentId);
  
      if (!assignment) {
        return res.status(404).json({ success: false, error: 'Assignment not found' });
      }
  
      res.json({ success: true, data: assignment });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

const createAssignment = async(req,res,next)=>{
    
    try {
        const userId = req.user.id;
        const {
          title,
          description,
          marks,
          thumbnailUrl,
          difficultyLevel,
          dueDate,
          createdBy
        } = req.body;
    
         
        const assignment = new Assignment({
          title,
          description,
          marks,
          thumbnailUrl,
          difficultyLevel,
          dueDate,
          createdBy
        });
    
        
        await assignment.save();
    
        res.status(201).json({ success: true, data: assignment });
      } catch (err) {
           return next(CustomError(err.message,500))
      }
}



const updateAssignment = async (req, res, next) => {
    try {
      const assignmentId = req.params.id;
      const updateData = req.body;
  
      const assignment = await Assignment.findByIdAndUpdate(assignmentId, updateData, { new: true });
  
      if (!assignment) {
        return next(CustomError('Assignment not found',404)) ;
      }
  
      res.status(200).json({ success: true, data: assignment });

    } catch (error) {
        return next(CustomError(err.message,500));
    }
  };


const deleteAssignment = async (req, res) => {
    try {
      const assignmentId = req.params.id;
      const userId = req.user.id;  
      const assignment = await Assignment.findById(assignmentId);
  
      if (!assignment) {
        return res.status(404).json({ success: false, message: 'Assignment not found' });
      }
 
      if (assignment.createdBy.toString() !== userId) {
        return res.status(403).json({ success: false, message: 'You are not authorized to delete this assignment' });
      }
  
    
      await Assignment.findByIdAndDelete(assignmentId);
  
      res.json({ success: true, message: 'Assignment deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }; 


module.exports = {
    createAssignment,
    updateAssignment,
    getAllAssignments,
    getAssignmentById,
    deleteAssignment
}