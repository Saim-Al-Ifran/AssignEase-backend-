
const SubmittedAssignment = require("../model/SubmittedAssignment");
const { uploadImageToCloudinary } = require("../utils/imageUpload");
const Assignment = require('../model/Assignment');

const  submitAssignment = async (req, res) => {
   
    try {
      const { assignment, user, note } = req.body;
      const file = req.file; 

      if (!file) {
        return res.status(400).json({ success: false, error: 'No file uploaded' });
      }
  
      const cloudinaryResponse = await uploadImageToCloudinary(file);
  
      const submittedAssignment = new SubmittedAssignment({
        assignment,
        user,
        pdfDocLink: cloudinaryResponse.secure_url,
        note
      });
  
      await submittedAssignment.save();
  
      res.status(201).json({ success: true, data: submittedAssignment });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };


 const getSubmittedAssignmentsByUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const { status } = req.query;
        let query = { user: userId };

        if (status) {
            query.status = status;
        }
 
        const submittedAssignments = await SubmittedAssignment.find(query);
        if(submittedAssignments.length === 0){
            return res.status(404).json({ message: 'No submitted assignments found' });
        }

        res.json({ success: true, data: submittedAssignments });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
 
  const getCreatedAssignmentsByUser = async (req, res) => {
    try {
      const userId = req.user._id;
      const createdAssignments = await Assignment.find({ createdBy: userId });

      res.json({ success: true, data: createdAssignments });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };


  const getAssignmentSubmissions = async (req, res) => {
    try {
        const userId = req.user._id;

         
        const assignments = await Assignment.find({ createdBy: userId });

        if (assignments.length === 0) {
            return res.status(404).json({ message: 'No assignments found for this user' });
        }

      
        const assignmentIds = assignments.map(a => a._id);
        
        
        const submittedAssignments = await SubmittedAssignment.find({ assignment: { $in: assignmentIds } });

        if (submittedAssignments.length === 0) {
            return res.status(404).json({ message: 'No submitted assignments found!!' });
        }

        return res.status(200).json({ message: 'Success', submissions: submittedAssignments });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
  const  assignMarks = async (req, res) => {
        try {
          const { assignmentId, submissionId, marks, feedback } = req.body;

          const submittedAssignment = await SubmittedAssignment.findById(submissionId);

          if (!submittedAssignment) {
            return res.status(404).json({ success: false, error: 'Submitted assignment not found' });
          }
          const assignment = await Assignment.findById(assignmentId);
          if (!assignment || assignment.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, error: 'You are not authorized to assign marks to this submission' });
          }

         
          submittedAssignment.marks = marks;
          submittedAssignment.feedback = feedback;
          submittedAssignment.status = 'completed';
          await submittedAssignment.save();

          res.json({ success: true, message: 'Marks assigned successfully' });
        } catch (error) {
          res.status(500).json({ success: false, error: error.message });
        }
  };



  module.exports = {
    submitAssignment,
    getSubmittedAssignmentsByUser,
    getCreatedAssignmentsByUser,
    getAssignmentSubmissions,
    assignMarks
  }